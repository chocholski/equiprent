using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientRepresentativesList
{
    public class PagedClientRepresentativesListResponse : ListViewModelBaseResponse<ClientRepresentative, ClientRepresentativeListItemViewModel>
    {
        public PagedClientRepresentativesListResponse(
            RequestParameters requestParameters,
            IQueryable<ClientRepresentative> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider)
        {
        }

        protected override async Task<ClientRepresentativeListItemViewModel> MapEntityToViewModelAsync(ClientRepresentative entity) =>
            await Task.FromResult(new ClientRepresentativeListItemViewModel
            {
                Email = entity.Address!.Email!,
                FirstName = entity.FirstName,
                Id = entity.Id,
                LastName = entity.LastName,
                PhoneNumber = entity.Address!.PhoneNumber!
            });
    }
}
