using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Entities.Application.Addresses;
using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Logic.Commands.Clients.Requests.CreateClientRepresentative;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Handlers.CreateClientRepresentative
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

            if (!createdById.HasValue ||
                !request.ClientId.HasValue)
            {
                return CommandResult.BadRequest;
            }

            var clientRepresentativeAddress = new Address
            {
                ApartmentNumber = request.Address.ApartmentNumber,
                City = request.Address.City,
                CountryId = request.Address.CountryId,
                Email = request.Address.Email,
                PhoneNumber = request.Address.PhoneNumber,
                PostalCode = request.Address.PostalCode,
                StreetName = request.Address.StreetName,
                StreetNumber = request.Address.StreetNumber,
            };
            _dbContext.Addresses.Add(clientRepresentativeAddress);

            var clientRepresentative = new ClientRepresentative
            {
                Address = clientRepresentativeAddress,
                ClientId = request.ClientId.Value,
                CreatedById = createdById.Value,
                CreatedOn = DateTime.Now,
                FirstName = request.FirstName,
                LastName = request.LastName,
            };
            _dbContext.ClientRepresentatives.Add(clientRepresentative);

            await _dbContext.SaveChangesAsync();

            return CommandResult.OK;
        }

        public async Task<CommandResult> ValidateAsync(CreateRequest request)
        {
            if (await _dbContext.ClientRepresentatives
                .Include(representative => representative.Address)
                .AnyAsync(representative =>
                    representative.ClientId == request.ClientId &&
                    !representative.IsDeleted &&
                    representative.LastName == request.LastName &&
                    representative.FirstName == request.FirstName &&
                    representative.Address!.Email == request.Address.Email &&
                    representative.Address!.PhoneNumber == request.Address.PhoneNumber))
            {
                return CommandResult.ClientRepresentative_RepresentativeExists;
            }

            return CommandResult.OK;
        }
    }
}
