using Equiprent.Entities.Application.Users;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Queries.Users.Handlers.PagedUsersList;
using System.Linq.Expressions;
using System.Threading;

namespace Equiprent.Logic.Queries.Users.Responses.PagedUsersList
{
    public class PagedUsersListResponse : ListViewModelBaseResponse<User, UserDto, UserListItemViewModel>
    {
        private static new readonly Expression<Func<User, UserDto>> _selector = entity => new UserDto
        {
            FirstName = entity.FirstName,
            Id = entity.Id,
            IsActive = entity.IsActive,
            LastName = entity.LastName,
            Login = entity.Login,
            UserRoleId = entity.UserRoleId,
        };

        public PagedUsersListResponse(
            RequestParameters requestParameters,
            IQueryable<User> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider, _selector)
        {
        }

        protected override async Task<UserListItemViewModel> MapEntityToViewModelAsync(UserDto entity, CancellationToken cancellationToken = default) =>
            await Task.FromResult(entity.Adapt<UserListItemViewModel>());
    }
}
