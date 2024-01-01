using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Addresses.Models;
using System.Threading;

namespace Equiprent.Logic.Queries.Clients.Responses.ClientById.ClientByIdMappers.Mappers
{
    internal class PrivateClientByIdMapper : ClientByIdMapper
    {
        private readonly PrivateClient _client;

        public PrivateClientByIdMapper(
            ApplicationDbContext dbContext,
            PrivateClient client) : base(dbContext)
        {
            _client = client;
        }

        public override async Task MapToResponseAsync(ClientByIdResponse response, CancellationToken cancellationToken = default)
        {
            response.Id = _client.Id;
            response.FirstName = _client.FirstName;
            response.LastName = _client.LastName;
            response.Name = _client.Name!;
            response.TypeId = _client.ClientTypeId;

            var clientAddress = await _dbContext.PrivateClientAddresses
                .Include(clientAddress => clientAddress.Address)
                .Where(clientAddress => clientAddress.PrivateClientId == _client.Id)
                .SingleOrDefaultAsync(cancellationToken);

            if (clientAddress is null)
                return;

            response.Addresses.Add(new ClientAddressModel
            {
                ApartmentNumber = clientAddress.Address.ApartmentNumber,
                City = clientAddress.Address.City,
                CountryId = clientAddress.Address.CountryId,
                Email = clientAddress.Address.Email,
                Id = clientAddress.Address.Id,
                NationalId = clientAddress.NationalCitizenId!,
                PhoneNumber = clientAddress.Address.PhoneNumber,
                PostalCode = clientAddress.Address.PostalCode,
                StreetName = clientAddress.Address.StreetName,
                StreetNumber = clientAddress.Address.StreetNumber,
            });
        }
    }
}
