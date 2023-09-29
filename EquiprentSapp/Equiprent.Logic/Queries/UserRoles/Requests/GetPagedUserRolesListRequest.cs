using Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Requests
{
    public record GetPagedUserRolesListRequest : IQuery<PagedUserRolesListResponse>
    {
        public RequestParameters RequestParameters { get; }

        public GetPagedUserRolesListRequest(RequestParameters requestParameters)
        {
            RequestParameters = requestParameters;

            if (string.IsNullOrEmpty(RequestParameters.SortColumnName) ||
                RequestParameters.SortColumnName == "null")
            {
                RequestParameters.SortColumnName = nameof(UserRoleListItemModel.Id);
            }
        }
    }
}
