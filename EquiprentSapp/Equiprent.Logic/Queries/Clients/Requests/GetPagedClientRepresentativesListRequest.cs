using Equiprent.Logic.Queries.Clients.Responses.PagedClientRepresentativesList;
using MediatR;

namespace Equiprent.Logic.Queries.Clients.Requests
{
    public class GetPagedClientRepresentativesListRequest : IRequest<PagedClientRepresentativesListResponse?>
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
