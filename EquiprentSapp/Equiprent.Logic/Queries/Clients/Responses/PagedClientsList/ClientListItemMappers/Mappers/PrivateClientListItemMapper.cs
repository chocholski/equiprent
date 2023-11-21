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

        public override void MapToModel(ClientListItemViewModel model)
        {
            model.FirstName = _client.FirstName;
            model.Id = _client.Id;
            model.LastName = _client.LastName;
            model.Name = _client.Name;
            model.NationalId = _client.CitizenAddresses.FirstOrDefault()?.NationalCitizenId;
            model.TypeId = _client.ClientTypeId;
        }
    }
}
