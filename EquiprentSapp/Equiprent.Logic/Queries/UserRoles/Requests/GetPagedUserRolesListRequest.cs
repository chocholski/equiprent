using Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList;
using MediatR;

namespace Equiprent.Logic.Queries.UserRoles.Requests
{
    public record GetPagedUserRolesListRequest : IRequest<PagedUserRolesListResponse?>
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
