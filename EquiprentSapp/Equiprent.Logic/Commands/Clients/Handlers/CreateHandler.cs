using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Entities.Business.Addresses;
using Equiprent.Entities.Business.ClientAddresses;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Enums;
using Equiprent.Extensions;
using Equiprent.Logic.Commands.Addresses.Models;
using Equiprent.Logic.Commands.Clients.Requests.Create;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Handlers
{
    public class CreateHandler : ICommandHandler<CreateRequest>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userService;

        public CreateHandler(
            ApplicationDbContext dbContext,
            IUserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        public async Task<CommandResult> HandleAsync(CreateRequest request)
        {
            var createdById = _userService.GetUserId();

            if (!createdById.HasValue)
                return CommandResult.BadRequest;

            var client = CreateClient(request, createdById.Value);

            if (client is null)
                return CommandResult.BadRequest;

            await AddClientAddressesAsync(client, request);

            await _dbContext.Clients.AddAndSaveAsync(client);

            return CommandResult.OK;
        }

        public async Task<CommandResult> ValidateAsync(CreateRequest request)
        {
            if (await ValidateIfExistClientWithSameNameAsync(request))
                return CommandResult.Client_NameExists;
            
            if (await ValidateIfExistClientWithSameNationalIdAsync(request))
                return CommandResult.Client_NationalIdExists;

            return CommandResult.OK;
        }

        private async Task<bool> ValidateIfExistClientWithSameNameAsync(CreateRequest request)
        {
            return await _dbContext.Clients.Where(c => c.Name == request.Name).AnyAsync();
        }

        private async Task<bool> ValidateIfExistClientWithSameNationalIdAsync(CreateRequest request)
        {
            return request.ClientTypeId switch
            {
                (int)ClientTypeEnum.Private => await ValidateIfExistPrivateClientWithSameCitizenNationalIdAsync(request),
                (int)ClientTypeEnum.Company => await ValidateIfExistCompanyClientWithSameCompanyNationalIdAsync(request),
                _ => false
            };
        }

        private async Task<bool> ValidateIfExistPrivateClientWithSameCitizenNationalIdAsync(CreateRequest request)
        {
            return await _dbContext.ClientAddresses.OfType<PrivateClientAddress>()
                .Where(address =>
                    !string.IsNullOrEmpty(address.NationalCitizenId) &&
                    request.Addresses.Select(address => address.NationalId).Contains(address.NationalCitizenId))
                .AnyAsync();
        }

        private async Task<bool> ValidateIfExistCompanyClientWithSameCompanyNationalIdAsync(CreateRequest request)
        {
            return await _dbContext.ClientAddresses.OfType<CompanyClientAddress>()
                .Where(address =>
                    !string.IsNullOrEmpty(address.NationalCompanyId) &&
                    request.Addresses.Select(address => address.NationalId).Contains(address.NationalCompanyId))
                .AnyAsync();
        }

        private static Client? CreateClient(CreateRequest request, Guid createdById)
        {
            return request.ClientTypeId switch
            {
                (int)ClientTypeEnum.Private => CreatePrivateClient(request, createdById),
                (int)ClientTypeEnum.Company => CreateCompanyClient(request, createdById),
                _ => null
            };
        }

        private static PrivateClient CreatePrivateClient(CreateRequest request, Guid createdById)
        {
            return new PrivateClient
            {
                ClientTypeId = request.ClientTypeId,
                CreatedById = createdById,
                CreatedOn = DateTime.Now,
                FirstName = request.FirstName!,
                LastName = request.LastName!,
                Name = request.Name,
            };
        }

        private static CompanyClient CreateCompanyClient(CreateRequest request, Guid createdById)
        {
            return new CompanyClient
            {
                ClientTypeId = request.ClientTypeId,
                CreatedById = createdById,
                CreatedOn = DateTime.Now,
                Name = request.Name,
            };
        }

        private async Task AddClientAddressesAsync(Client client, CreateRequest request)
        {
            if (request.ClientTypeId == (int)ClientTypeEnum.Private)
            {
                await AddPrivateClientAddressesAsync(client, request);
            }
            else if (request.ClientTypeId == (int)ClientTypeEnum.Company)
            {
                await AddCompanyClientAddressesAsync(client, request);
            }
        }

        private async Task AddPrivateClientAddressesAsync(Client client, CreateRequest request)
        {
            var clientAddresses = new List<PrivateClientAddress>();

            foreach (var requestAddress in request.Addresses)
            {
                var address = await GetClientAddressAsync(requestAddress);

                if (address is null)
                {
                    address = CreateAddress(requestAddress);
                    _dbContext.Addresses.Add(address);
                }

                clientAddresses.Add(new PrivateClientAddress
                {
                    Client = client,
                    Address = address,
                    NationalCitizenId = requestAddress.NationalId
                });
            }

            if (!clientAddresses.IsNullOrEmpty())
                _dbContext.ClientAddresses.AddRange(clientAddresses);
        }

        private async Task AddCompanyClientAddressesAsync(Client client, CreateRequest request)
        {
            var clientAddresses = new List<CompanyClientAddress>();

            foreach (var requestAddress in request.Addresses)
            {
                var address = await GetClientAddressAsync(requestAddress);

                if (address is null)
                {
                    address = CreateAddress(requestAddress);
                    _dbContext.Addresses.Add(address);
                }

                clientAddresses.Add(new CompanyClientAddress
                {
                    Client = client,
                    Address = address,
                    NationalCompanyId = requestAddress.NationalId
                });
            }

            if (!clientAddresses.IsNullOrEmpty())
                _dbContext.ClientAddresses.AddRange(clientAddresses);
        }

        private async Task<Address?> GetClientAddressAsync(ClientAddressModel model)
        {
            return await _dbContext.Addresses
                    .FirstOrDefaultAsync(a =>
                        a.ApartmentNumber == model.ApartmentNumber &&
                        a.CountryId == model.CountryId &&
                        a.Email == model.Email &&
                        a.PhoneNumber == model.PhoneNumber &&
                        a.StreetName == model.StreetName &&
                        a.StreetNumber == model.StreetNumber);
        }

        private static Address CreateAddress(AddressModel model)
        {
            return new Address
            {
                ApartmentNumber = model.ApartmentNumber,
                CountryId = model.CountryId,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                StreetName = model.StreetName,
                StreetNumber = model.StreetNumber,
            };
        }
    }
}
