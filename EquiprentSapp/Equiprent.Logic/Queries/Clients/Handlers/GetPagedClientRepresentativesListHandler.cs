using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientRepresentativesList;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Clients.Handlers
{
    public class GetPagedClientRepresentativesListHandler : IRequestHandler<GetPagedClientRepresentativesListRequest, PagedClientRepresentativesListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedClientRepresentativesListHandler(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
        }

        public async Task<PagedClientRepresentativesListResponse?> Handle(GetPagedClientRepresentativesListRequest request, CancellationToken cancellationToken = default)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedClientRepresentativesListResponse, ClientRepresentative, ClientRepresentativeListItemViewModel>(
                requestParameters: request.RequestParameters,
                query: GetClientRepresentativesListQuery(request),
                _serviceProvider,
                cancellationToken);

            return response;
        }

        private IQueryable<ClientRepresentative> GetClientRepresentativesListQuery(GetPagedClientRepresentativesListRequest request)
        {
            return _dbContext.ClientRepresentatives
                .Include(representative => representative.Address)
                .Where(representative =>
                    !representative.IsDeleted &&
                    representative.ClientId == request.ClientId);
        }
    }
}
