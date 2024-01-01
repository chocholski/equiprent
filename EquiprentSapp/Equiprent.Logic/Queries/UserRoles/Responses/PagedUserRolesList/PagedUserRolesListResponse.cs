using Equiprent.Entities.Application.UserRoles;
using Equiprent.Logic.Abstractions;
using System.Threading;

namespace Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList
{
    public class PagedUserRolesListResponse : ListViewModelBaseResponse<UserRole, UserRoleListItemModel>
    {
        public PagedUserRolesListResponse(
            RequestParameters requestParameters,
            IQueryable<UserRole> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider)
        {
        }

        protected override async Task<UserRoleListItemModel> MapEntityToViewModelAsync(UserRole entity, CancellationToken cancellationToken = default) =>
            await Task.FromResult(new UserRoleListItemModel
            {
                Id = entity.Id
            });
    }
}
