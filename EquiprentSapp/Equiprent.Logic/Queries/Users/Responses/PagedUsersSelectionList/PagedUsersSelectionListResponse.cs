using Equiprent.Entities.Application.Users;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Queries.Users.Handlers.PagedUsersSelectionList;
using System.Linq.Expressions;
using System.Threading;

namespace Equiprent.Logic.Queries.Users.Responses.PagedUsersSelectionList
{
    public class PagedUsersSelectionListResponse : ListViewModelBaseResponse<User, UserDto, UserSelectionListItemModel>
    {
        private static new readonly Expression<Func<User, UserDto>> _selector = entity => new UserDto
        {
            FirstName = entity.FirstName,
            Id = entity.Id,
            LastName = entity.LastName,
            Login = entity.Login,
            UserRoleId = entity.UserRoleId,
        };

        public PagedUsersSelectionListResponse(
            RequestParameters requestParameters,
            IQueryable<User> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider, _selector)
        {
        }

        protected override async Task<UserSelectionListItemModel> MapEntityToViewModelAsync(UserDto entity, CancellationToken cancellationToken = default) =>
            await Task.FromResult(entity.Adapt<UserSelectionListItemModel>());
    }
}
