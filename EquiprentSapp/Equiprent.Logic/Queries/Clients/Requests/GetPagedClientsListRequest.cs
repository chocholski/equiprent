using Equiprent.Logic.Queries.Clients.Responses.PagedClientsList;
using MediatR;

namespace Equiprent.Logic.Queries.Clients.Requests
{
    public class GetPagedClientsListRequest : IRequest<PagedClientsListResponse?>
    {
        public RequestParameters RequestParameters { get; set; }

        public GetPagedClientsListRequest(RequestParameters requestParameters)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(ClientListItemViewModel));
        }
    }
}
