using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Compositions;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Creators;
using Equiprent.Logic.Commands.Clients.Requests.Create;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create
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

            var clientCreator = new ClientCreatorFactory(_dbContext).GetClientCreator(request);
            if (clientCreator is null)
                return CommandResult.BadRequest;

            var client = clientCreator.CreateClientWithRequest(
                new CreateRequestWithCreatorId(request, createdById.Value));

            if (client is null)
                return CommandResult.BadRequest;

            clientCreator.CreateClientAddressesWithRequest(client, request);
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
            return await _dbContext.Clients
                .Where(c =>
                    !c.IsDeleted &&
                    c.Name == request.Name)
                .AnyAsync();
        }

        private async Task<bool> ValidateIfExistClientWithSameNationalIdAsync(CreateRequest request)
        {
            return request.TypeId switch
            {
                (int)ClientTypeEnum.Private => await ValidateIfExistPrivateClientWithSameCitizenNationalIdAsync(request),
                (int)ClientTypeEnum.Company => await ValidateIfExistCompanyClientWithSameCompanyNationalIdAsync(request),
                _ => false
            };
        }

        private async Task<bool> ValidateIfExistPrivateClientWithSameCitizenNationalIdAsync(CreateRequest request)
        {
            return await _dbContext.PrivateClientAddresses
                .Include(clientAddress => clientAddress.PrivateClient)
                .Where(clientAddress =>
                    !clientAddress.PrivateClient.IsDeleted &&
                    !string.IsNullOrEmpty(clientAddress.NationalCitizenId) &&
                    request.Addresses.Select(address => address.NationalId).Contains(clientAddress.NationalCitizenId))
                .AnyAsync();
        }

        private async Task<bool> ValidateIfExistCompanyClientWithSameCompanyNationalIdAsync(CreateRequest request)
        {
            return await _dbContext.CompanyClientAddresses
                .Include(clientAddress => clientAddress.CompanyClient)
                .Where(clientAddress =>
                    !clientAddress.CompanyClient.IsDeleted &&
                    !string.IsNullOrEmpty(clientAddress.NationalCompanyId) &&
                    request.Addresses.Select(address => address.NationalId).Contains(clientAddress.NationalCompanyId))
                .AnyAsync();
        }
    }
}
