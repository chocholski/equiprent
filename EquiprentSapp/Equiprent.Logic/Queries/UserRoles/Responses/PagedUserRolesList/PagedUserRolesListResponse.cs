using Equiprent.Entities.Application.UserRoles;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Queries.UserRoles.Handlers.PagedUserRolesList;
using System.Linq.Expressions;
using System.Threading;

namespace Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList
{
    public class PagedUserRolesListResponse : ListViewModelBaseResponse<UserRole, UserRoleDto, UserRoleListItemModel>
    {
        private static new readonly Expression<Func<UserRole, UserRoleDto>> _selector = entity => new UserRoleDto
        {
            Id = entity.Id,
        };

        public PagedUserRolesListResponse(
            RequestParameters requestParameters,
            IQueryable<UserRole> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider, _selector)
        {
        }

        protected override async Task<UserRoleListItemModel> MapEntityToViewModelAsync(UserRoleDto entity, CancellationToken cancellationToken = default) =>
            await Task.FromResult(entity.Adapt<UserRoleListItemModel>());
    }
}
