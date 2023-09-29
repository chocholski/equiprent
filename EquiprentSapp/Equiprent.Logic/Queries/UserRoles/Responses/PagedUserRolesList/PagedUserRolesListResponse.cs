using Equiprent.ApplicationServices.Database;
using Equiprent.Entities.Application;
using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList
{
    public class PagedUserRolesListResponse : ListViewModelBaseResponse<UserRole, UserRoleListItemModel>
    {
        public PagedUserRolesListResponse(
            RequestParameters requestParameters,
            IDbStatementService dbStatementService,
            IQueryable<UserRole> query) : base(requestParameters, dbStatementService, query)
        {
        }

        protected override async Task<UserRoleListItemModel> MapEntityToViewModelAsync(UserRole entity) =>
            await Task.FromResult(new UserRoleListItemModel
            {
                Id = entity.Id
            });
    }
}
