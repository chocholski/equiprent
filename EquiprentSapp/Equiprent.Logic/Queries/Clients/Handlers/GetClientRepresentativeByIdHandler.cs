using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Addresses.Models;
using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.ClientRepresentativeById;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Clients.Handlers
{
    public class GetClientRepresentativeByIdHandler : IRequestHandler<GetClientRepresentativeByIdRequest, ClientRepresentativeByIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetClientRepresentativeByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ClientRepresentativeByIdResponse?> Handle(GetClientRepresentativeByIdRequest request, CancellationToken cancellationToken = default)
        {
            var clientRepresentative = await _dbContext.ClientRepresentatives
                .Include(representative => representative.Address)
                .SingleOrDefaultAsync(representative =>
                    !representative.IsDeleted &&
                    representative.Id == request.ClientRepresentativeId,
                    cancellationToken);

            if (clientRepresentative is null)
                return null;

            var result = new ClientRepresentativeByIdResponse
            {
                Address = new AddressModel
                {
                    ApartmentNumber = clientRepresentative.Address!.ApartmentNumber,
                    City = clientRepresentative.Address!.City,
                    CountryId = clientRepresentative.Address!.CountryId,
                    Email = clientRepresentative.Address!.Email,
                    Id = clientRepresentative.AddressId!.Value,
                    PhoneNumber = clientRepresentative.Address!.PhoneNumber,
                    PostalCode = clientRepresentative.Address!.PostalCode,
                    StreetName = clientRepresentative.Address!.StreetName,
                    StreetNumber = clientRepresentative.Address!.StreetNumber
                },
                ClientId = clientRepresentative.ClientId,
                FirstName = clientRepresentative.FirstName,
                Id = clientRepresentative.Id,
                LastName = clientRepresentative.LastName,
            };

            return result;
        }
    }
}
