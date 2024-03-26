using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.UserRoleToLanguages;
using Equiprent.Entities.Application.Users;
using Equiprent.Logic.Queries.Users.Requests;
using Equiprent.Logic.Queries.Users.Responses.PagedUsersSelectionList;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Users.Handlers.PagedUsersSelectionList
{
    public class GetPagedUsersSelectionListHandler : IRequestHandler<GetPagedUsersSelectionListRequest, PagedUsersSelectionListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedUsersSelectionListHandler(
            ApplicationDbContext dbContext,
            ILanguageableService languageableService,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _languageableService = languageableService;
            _serviceProvider = serviceProvider;
        }

        public async Task<PagedUsersSelectionListResponse?> Handle(GetPagedUsersSelectionListRequest request, CancellationToken cancellationToken)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedUsersSelectionListResponse, User, UserDto, UserSelectionListItemModel>(
                requestParameters: request.RequestParameters,
                query: GetUsersSelectionListQueryWithRequest(request),
                _serviceProvider,
                cancellationToken);

            if (response is not null)
            {
                await _languageableService.TranslateListLanguageableValuesAsync<UserSelectionListItemModel, UserRoleToLanguage>(
                    response.List,
                    idPropertyName: nameof(UserSelectionListItemModel.UserRoleId),
                    namePropertyName: nameof(UserSelectionListItemModel.UserRoleName),
                    cancellationToken: cancellationToken);
            }

            return response;
        }

        private IQueryable<User> GetUsersSelectionListQueryWithRequest(GetPagedUsersSelectionListRequest request)
        {
            return _dbContext.Users
                .Include(u => u.UserRole)
                .Where(u => !u.IsDeleted && u.IsActive);
        }
    }
}
