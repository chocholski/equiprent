using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Logic.Commands.Clients.Requests.SaveClientRepresentative;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Handlers.SaveClientRepresentative
{
    public class SaveHandler : ICommandHandler<SaveRequest>
    {
        private readonly ApplicationDbContext _dbContext;

        public SaveHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult> HandleAsync(SaveRequest request)
        {
            var clientRepresentative = await _dbContext.ClientRepresentatives
                .SingleOrDefaultAsync(representative =>
                    !representative.IsDeleted &&
                    representative.Id == request.Id);

            if (clientRepresentative is null ||
                clientRepresentative.ClientId != request.ClientId)
                return CommandResult.BadRequest;

            var clientUpdateResult = await UpdateClientRepresentativeWithRequestAsync(clientRepresentative, request);

            if (clientUpdateResult == CommandResult.OK)
                await _dbContext.SaveChangesAsync();

            return clientUpdateResult;
        }

        private async Task<CommandResult> UpdateClientRepresentativeWithRequestAsync(ClientRepresentative representative, SaveRequest request)
        {
            var clientRepresentativeAddressUpdateResult = await UpdateClientRepresentativeAddressWithRequestAsync(request);

            if (clientRepresentativeAddressUpdateResult != CommandResult.OK)
                return clientRepresentativeAddressUpdateResult;

            representative.FirstName = request.FirstName;
            representative.LastName = request.LastName;

            _dbContext.ClientRepresentatives.Update(representative);

            return CommandResult.OK;
        }

        private async Task<CommandResult> UpdateClientRepresentativeAddressWithRequestAsync(SaveRequest request)
        {
            var clientRepresentativeAddress = await _dbContext.Addresses
                .SingleOrDefaultAsync(a => a.Id == request.Address.Id);

            if (clientRepresentativeAddress is null)
                return CommandResult.BadRequest;

            clientRepresentativeAddress.ApartmentNumber = request.Address.ApartmentNumber;
            clientRepresentativeAddress.City = request.Address.City;
            clientRepresentativeAddress.CountryId = request.Address.CountryId;
            clientRepresentativeAddress.Email = request.Address.Email;
            clientRepresentativeAddress.PhoneNumber = request.Address.PhoneNumber;
            clientRepresentativeAddress.PostalCode = request.Address.PostalCode;
            clientRepresentativeAddress.StreetName = request.Address.StreetName;
            clientRepresentativeAddress.StreetNumber = request.Address.StreetNumber;

            _dbContext.Addresses.Update(clientRepresentativeAddress);

            return CommandResult.OK;
        }
    }
}
