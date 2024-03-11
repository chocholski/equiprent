using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.GeneralModels;
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

        public override async Task<ClientByIdResponse> MapToResponseAsync(CancellationToken cancellationToken = default)
        {
            var response = new ClientByIdResponse
            {
                Id = _client.Id,
                FirstName = _client.FirstName,
                LastName = _client.LastName,
                Name = _client.Name!,
                TypeId = _client.ClientTypeId,
            };

            var clientAddress = await _dbContext.PrivateClientAddresses
                .Include(clientAddress => clientAddress.Address)
                .ThenInclude(clientAddress => clientAddress.Country)
                .Where(clientAddress => clientAddress.PrivateClientId == _client.Id)
                .SingleOrDefaultAsync(cancellationToken);

            if (clientAddress is null)
                return response;

            response.Addresses.Add(new ClientAddressModel
            {
                ApartmentNumber = clientAddress.Address.ApartmentNumber,
                City = clientAddress.Address.City,
                Country = new CountryModel
                {
                    Id = clientAddress.Address.CountryId,
                    Code = clientAddress.Address.Country.Code,
                },
                Email = clientAddress.Address.Email,
                Id = clientAddress.Address.Id,
                NationalId = clientAddress.NationalCitizenId!,
                PhoneNumber = clientAddress.Address.PhoneNumber,
                PostalCode = clientAddress.Address.PostalCode,
                StreetName = clientAddress.Address.StreetName,
                StreetNumber = clientAddress.Address.StreetNumber,
            });

            return response;
        }
    }
}
