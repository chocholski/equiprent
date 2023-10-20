using Equiprent.Logic.Queries.Users.Requests;
using Equiprent.ApplicationServices.Languageables;
using Equiprent.Entities.Application;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Users.Responses.PagedUsersList;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetPagedUsersListHandler : IQueryHandler<GetPagedUsersListRequest, PagedUsersListResponse>
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

        public async Task<PagedUsersListResponse?> HandleAsync(GetPagedUsersListRequest request)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedUsersListResponse, User, UserListItemViewModel>(
                requestParameters: request.RequestParameters,
                query:
                    _dbContext.Users
                    .Include(u => u.UserRole)
                    .Where(u =>
                        !u.IsDeleted &&
                        (
                            !request.UserRoleId.HasValue ||
                            u.UserRoleId == request.UserRoleId.Value)
                        ),
                _serviceProvider);

            if (response is not null)
            {
                await _languageableService.TranslateLanguageableValuesAsync<UserListItemViewModel, UserRoleToLanguage>(
                    response.List,
                    idPropertyName: nameof(UserListItemViewModel.UserRoleId),
                    namePropertyName: nameof(UserListItemViewModel.UserRoleName));
            }

            return response;
        }
    }
}
