using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Logic.Commands.Clients.Requests.SaveClientRepresentative;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.SaveClientRepresentative
{
    public class SaveHandler : IRequestHandler<SaveRequest, CommandResult?>
    {
        private readonly ApplicationDbContext _dbContext;

        public SaveHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult?> Handle(SaveRequest request, CancellationToken cancellationToken)
        {
            var clientRepresentative = await _dbContext.ClientRepresentatives
                .SingleOrDefaultAsync(representative =>
                    !representative.IsDeleted &&
                    representative.Id == request.Id,
                    cancellationToken);

            if (clientRepresentative is null ||
                clientRepresentative.ClientId != request.ClientId)
                return CommandResult.BadRequest;

            var clientUpdateResult = await UpdateClientRepresentativeWithRequestAsync(clientRepresentative, request, cancellationToken);

            if (clientUpdateResult.IsOk())
                await _dbContext.SaveChangesAsync(cancellationToken);

            return clientUpdateResult;
        }

        private async Task<CommandResult> UpdateClientRepresentativeWithRequestAsync(ClientRepresentative representative, SaveRequest request, CancellationToken cancellationToken = default)
        {
            var clientRepresentativeAddressUpdateResult = await UpdateClientRepresentativeAddressWithRequestAsync(request, cancellationToken);

            if (!clientRepresentativeAddressUpdateResult.IsOk())
                return clientRepresentativeAddressUpdateResult;

            representative.FirstName = request.FirstName;
            representative.LastName = request.LastName;

            _dbContext.ClientRepresentatives.Update(representative);

            return CommandResult.OK;
        }

        private async Task<CommandResult> UpdateClientRepresentativeAddressWithRequestAsync(SaveRequest request, CancellationToken cancellationToken = default)
        {
            var clientRepresentativeAddress = await _dbContext.Addresses
                .SingleOrDefaultAsync(a => a.Id == request.Address.Id, cancellationToken);

            if (clientRepresentativeAddress is null)
                return CommandResult.BadRequest;

            clientRepresentativeAddress.ApartmentNumber = request.Address.ApartmentNumber;
            clientRepresentativeAddress.City = request.Address.City;
            clientRepresentativeAddress.CountryId = request.Address.Country.Id;
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
