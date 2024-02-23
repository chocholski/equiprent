using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Queries.Clients.Handlers.PagedClientRepresentativesList;
using System.Linq.Expressions;
using System.Threading;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientRepresentativesList
{
    public class PagedClientRepresentativesListResponse : ListViewModelBaseResponse<ClientRepresentative, ClientRepresentativeDto, ClientRepresentativeListItemViewModel>
    {
        private static new readonly Expression<Func<ClientRepresentative, ClientRepresentativeDto>> _selector = entity => new ClientRepresentativeDto
        {
            Email = entity.Address!.Email!,
            FirstName = entity.FirstName,
            Id = entity.Id,
            LastName = entity.LastName,
            PhoneNumber = entity.Address!.PhoneNumber!
        };

        public PagedClientRepresentativesListResponse(
            RequestParameters requestParameters,
            IQueryable<ClientRepresentative> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider, _selector)
        {
        }

        protected override async Task<ClientRepresentativeListItemViewModel> MapEntityToViewModelAsync(ClientRepresentativeDto entity, CancellationToken cancellationToken = default) =>
            await Task.FromResult(entity.Adapt<ClientRepresentativeListItemViewModel>());
    }
}
