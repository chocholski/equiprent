using Equiprent.Logic.Queries.Users.Responses.PagedUsersList;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Requests
{
    public record GetPagedUsersListRequest : IQuery<PagedUsersListResponse> 
    {
        public RequestParameters RequestParameters { get; }
        public int? UserRoleId { get; set; }

        public GetPagedUsersListRequest(
            RequestParameters requestParameters,
            int? userRoleId)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(UserListItemViewModel));
            UserRoleId = userRoleId;
        }
    }
}
