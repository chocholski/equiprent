using Equiprent.Logic.Queries.Users.Requests;
using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Users.Responses.PagedUsersList;
using Equiprent.Entities.Application.UserRoleToLanguages;
using Equiprent.Entities.Application.Users;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetPagedUsersListHandler : IRequestHandler<GetPagedUsersListRequest, PagedUsersListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedUsersListHandler(
            ApplicationDbContext dbContext,
            ILanguageableService languageableService,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _languageableService = languageableService;
            _serviceProvider = serviceProvider;
        }

        public async Task<PagedUsersListResponse?> Handle(GetPagedUsersListRequest request, CancellationToken cancellationToken)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedUsersListResponse, User, UserListItemViewModel>(
                requestParameters: request.RequestParameters,
                query: GetUserListQueryUsingRequest(request),
                _serviceProvider,
                cancellationToken);

            if (response is not null)
            {
                await _languageableService.TranslateListLanguageableValuesAsync<UserListItemViewModel, UserRoleToLanguage>(
                    response.List,
                    idPropertyName: nameof(UserListItemViewModel.UserRoleId),
                    namePropertyName: nameof(UserListItemViewModel.UserRoleName),
                    cancellationToken: cancellationToken);
            }

            return response;
        }

        private IQueryable<User> GetUserListQueryUsingRequest(GetPagedUsersListRequest request)
        {
            return _dbContext.Users
                .Include(u => u.UserRole)
                .Where(u =>
                    !u.IsDeleted &&
                    (
                        !request.UserRoleId.HasValue ||
                        u.UserRoleId == request.UserRoleId.Value)
                    );
        }
    }
}
