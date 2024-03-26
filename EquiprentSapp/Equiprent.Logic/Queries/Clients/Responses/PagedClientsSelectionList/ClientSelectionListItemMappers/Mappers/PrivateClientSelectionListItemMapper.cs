using Equiprent.Entities.Business.Clients;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList.ClientSelectionListItemMappers.Mappers
{
    internal class PrivateClientSelectionListItemMapper : ClientSelectionListItemMapper
    {
        private readonly PrivateClient _client;

        public PrivateClientSelectionListItemMapper(PrivateClient client)
        {
            _client = client;
        }

        public override ClientSelectionListItemViewModel MapToModel()
        {
            return new ClientSelectionListItemViewModel
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
