using Equiprent.Logic.Queries.Users.Responses.PagedUsersSelectionList;
using MediatR;

namespace Equiprent.Logic.Queries.Users.Requests
{
    public class GetPagedUsersSelectionListRequest : IRequest<PagedUsersSelectionListResponse?>
    {
        public RequestParameters RequestParameters { get; set; }

        public GetPagedUsersSelectionListRequest(RequestParameters requestParameters)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(UserSelectionListItemModel));
        }
    }
}
