using Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList;
using MediatR;

namespace Equiprent.Logic.Queries.Clients.Requests
{
    public class GetPagedClientsSelectionListRequest : IRequest<PagedClientsSelectionListResponse?>
    {
        public RequestParameters RequestParameters { get; set; }

        public IEnumerable<Guid>? IgnoredIds { get; set; }

        public GetPagedClientsSelectionListRequest(RequestParameters requestParameters, IEnumerable<Guid>? ignoredIds = null)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(ClientSelectionListItemViewModel));
            IgnoredIds = ignoredIds;
        }
    }
}
