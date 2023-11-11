using Equiprent.ApplicationServices.Languageables;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.UserRoleToLanguages;
using Equiprent.Logic.Queries.UserRoles.Requests;
using Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Handlers
{
    public class GetPagedUserRolesListHandler : IQueryHandler<GetPagedUserRolesListRequest, PagedUserRolesListResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedUserRolesListHandler(
            ApplicationDbContext dbContext,
            ILanguageableService languageableService,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _languageableService = languageableService;
            _serviceProvider = serviceProvider;
        }

        public async Task<PagedUserRolesListResponse?> HandleAsync(GetPagedUserRolesListRequest request)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedUserRolesListResponse, Entities.Application.UserRoles.UserRole, UserRoleListItemModel>(
                requestParameters: request.RequestParameters,
                query:
                    _dbContext.UserRoles
                        .Where(r => !r.IsDeleted),
                _serviceProvider);

            if (response is not null)
            {
                await _languageableService.TranslateLanguageableValuesAsync<UserRoleListItemModel, UserRoleToLanguage>(
                    response.List,
                    idPropertyName: nameof(UserRoleListItemModel.Id),
                    namePropertyName: nameof(UserRoleListItemModel.Name));
            }

            return response;
        }
    }
}
