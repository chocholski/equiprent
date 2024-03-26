using Equiprent.Logic.Queries.Users.Responses.PagedUsersSelectionList;
using MediatR;

namespace Equiprent.Logic.Queries.Users.Requests
{
    public class GetPagedUsersSelectionListRequest : IRequest<PagedUsersSelectionListResponse?>
    {
        public RequestParameters RequestParameters { get; set; }

        public IEnumerable<Guid>? IgnoredIds { get; set; }

        public GetPagedUsersSelectionListRequest(RequestParameters requestParameters, IEnumerable<Guid>? ignoredIds = null)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(UserSelectionListItemModel));
            IgnoredIds = ignoredIds;
        }
    }
}
