using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList.ClientSelectionListItemMappers;
using System.Threading;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList
{
    public class PagedClientsSelectionListResponse : ListViewModelBaseResponse<Client, Client, ClientSelectionListItemViewModel>
    {
        public PagedClientsSelectionListResponse(
            RequestParameters requestParameters,
            IQueryable<Client> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider)
        {
        }

        protected override async Task<ClientSelectionListItemViewModel> MapEntityToViewModelAsync(Client entity, CancellationToken cancellationToken = default)
        {
            var clientSelectionListItemMapper = ClientSelectionListItemMapperFactory.CreateMapperFor(entity);
            var response = clientSelectionListItemMapper?.MapToModel();

            return await Task.FromResult(response ?? new ClientSelectionListItemViewModel { Id = default, TypeId = default, TypeName = default });
        }
    }
}
