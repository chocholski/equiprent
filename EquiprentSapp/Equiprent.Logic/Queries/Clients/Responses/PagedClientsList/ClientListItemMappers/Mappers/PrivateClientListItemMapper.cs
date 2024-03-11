using Equiprent.Entities.Business.Clients;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientsList.ClientListItemMappers.Mappers
{
    internal class PrivateClientListItemMapper : ClientListItemMapper
    {
        private readonly PrivateClient _client;

        public PrivateClientListItemMapper(PrivateClient client)
        {
            _client = client;
        }

        public override ClientListItemViewModel MapToModel()
        {
            return new ClientListItemViewModel
            {
                FirstName = _client.FirstName,
                Id = _client.Id,
                LastName = _client.LastName,
                Name = _client.Name,
                NationalId = _client.CitizenAddresses.FirstOrDefault()?.NationalCitizenId,
                TypeId = _client.ClientTypeId,
            };
        }
    }
}
