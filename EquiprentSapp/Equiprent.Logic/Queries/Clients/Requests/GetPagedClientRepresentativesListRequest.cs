using Equiprent.Logic.Queries.Clients.Responses.PagedClientRepresentativesList;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Clients.Requests
{
    public class GetPagedClientRepresentativesListRequest : IQuery<PagedClientRepresentativesListResponse>
    {
        public Guid ClientId { get; set; }
        public RequestParameters RequestParameters { get; set; }

        public GetPagedClientRepresentativesListRequest(RequestParameters requestParameters, Guid clientId)
        {
            ClientId = clientId;
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(ClientRepresentativeListItemViewModel));
        }
    }
}
