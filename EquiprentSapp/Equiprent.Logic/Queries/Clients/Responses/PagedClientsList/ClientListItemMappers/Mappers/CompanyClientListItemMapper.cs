using Equiprent.Entities.Business.Clients;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientsList.ClientListItemMappers.Mappers
{
    internal class CompanyClientListItemMapper : ClientListItemMapper
    {
        private readonly CompanyClient _client;

        public CompanyClientListItemMapper(CompanyClient client)
        {
            _client = client;
        }

        public override void MapToModel(ClientListItemViewModel model)
        {
            model.Id = _client.Id;
            model.Name = _client.Name;
            model.NationalId = _client.CompanyAddresses.FirstOrDefault()?.NationalCompanyId;
            model.TypeId = _client.ClientTypeId;
        }
    }
}
