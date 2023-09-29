using Equiprent.ApplicationServices.Database;
using Equiprent.ApplicationServices.Languageables;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application;
using Equiprent.Logic.Queries.UserRoles.Requests;
using Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Handlers
{
    public class GetPagedUserRolesListHandler : IQueryHandler<GetPagedUserRolesListRequest, PagedUserRolesListResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IDbStatementService _dbStatementService;
        private readonly ILanguageableService _languageableService;

        public GetPagedUserRolesListHandler(
            ApplicationDbContext dbContext,
            IDbStatementService dbStatementService,
            ILanguageableService languageableService)
        {
            _dbContext = dbContext;
            _dbStatementService = dbStatementService;
            _languageableService = languageableService;
        }

        public async Task<PagedUserRolesListResponse?> HandleAsync(GetPagedUserRolesListRequest request)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedUserRolesListResponse, UserRole, UserRoleListItemModel>(
                requestParameters: request.RequestParameters,
                _dbStatementService,
                query:
                    _dbContext.UserRoles
                        .Where(r => !r.IsDeleted));

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
