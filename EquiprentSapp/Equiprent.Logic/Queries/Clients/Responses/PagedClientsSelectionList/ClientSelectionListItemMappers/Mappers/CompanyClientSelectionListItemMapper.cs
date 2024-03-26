using Equiprent.Entities.Business.Clients;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList.ClientSelectionListItemMappers.Mappers
{
    internal class CompanyClientSelectionListItemMapper : ClientSelectionListItemMapper
    {
        private readonly CompanyClient _client;

        public CompanyClientSelectionListItemMapper(CompanyClient client)
        {
            _client = client;
        }

        public override ClientSelectionListItemViewModel MapToModel()
        {
            return new ClientSelectionListItemViewModel
            {
                Id = _client.Id,
                Name = _client.Name,
                NationalId = _client.CompanyAddresses.FirstOrDefault()?.NationalCompanyId,
                TypeId = _client.ClientTypeId
            };
        }
    }
}
