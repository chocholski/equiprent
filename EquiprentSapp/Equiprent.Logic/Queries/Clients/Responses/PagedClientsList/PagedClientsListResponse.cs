using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientsList.ClientListItemMappers;
using System.Threading;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientsList
{
    public class PagedClientsListResponse : ListViewModelBaseResponse<Client, ClientListItemViewModel>
    {
        public PagedClientsListResponse(
            RequestParameters requestParameters,
            IQueryable<Client> query,
            IServiceProvider serviceProvider): base(requestParameters, query, serviceProvider)
        {
        }

        protected override async Task<ClientListItemViewModel> MapEntityToViewModelAsync(Client entity, CancellationToken cancellationToken = default)
        {
            var result = new ClientListItemViewModel();
            var clientListItemMapper = ClientListItemMapperFactory.CreateMapperFor(entity);

            clientListItemMapper?.MapToModel(result);

            return await Task.FromResult(result);
        }
    }
}
