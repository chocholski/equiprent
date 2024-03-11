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

        public override ClientListItemViewModel MapToModel()
        {
            return new ClientListItemViewModel
            {
                Id = _client.Id,
                Name = _client.Name,
                NationalId = _client.CompanyAddresses.FirstOrDefault()?.NationalCompanyId,
                TypeId = _client.ClientTypeId
            };
        }
    }
}
