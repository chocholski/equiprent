using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.Addresses;
using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Logic.Commands.Clients.Requests.CreateClientRepresentative;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.CreateClientRepresentative
{
    public class CreateHandler : IRequestHandler<CreateRequest, CommandResult?>
    {
        private readonly ApplicationDbContext _dbContext;

        public CreateHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult?> Handle(CreateRequest request, CancellationToken cancellationToken)
        {
            if (!request.ClientId.HasValue)
                return CommandResult.BadRequest;

            var clientRepresentativeAddress = new Address
            {
                ApartmentNumber = request.Address.ApartmentNumber,
                City = request.Address.City,
                CountryId = request.Address.Country.Id,
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
                CreatedById = request.CreatedById,
                CreatedOn = DateTime.Now,
                FirstName = request.FirstName,
                LastName = request.LastName,
            };
            _dbContext.ClientRepresentatives.Add(clientRepresentative);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return CommandResult.OK;
        }
    }
}
