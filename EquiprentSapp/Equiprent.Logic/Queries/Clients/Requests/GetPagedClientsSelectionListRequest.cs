using Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList;
using MediatR;

namespace Equiprent.Logic.Queries.Clients.Requests
{
    public class GetPagedClientsSelectionListRequest : IRequest<PagedClientsSelectionListResponse?>
    {
        public RequestParameters RequestParameters { get; set; }

        public GetPagedClientsSelectionListRequest(RequestParameters requestParameters)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(ClientSelectionListItemViewModel));
        }
    }
}
