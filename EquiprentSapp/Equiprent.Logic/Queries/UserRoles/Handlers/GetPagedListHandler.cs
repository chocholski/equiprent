using Equiprent.ApplicationServices.Languageables;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application;
using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.UserRoles.Messages;
using Equiprent.Logic.Queries.UserRoles.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using static Equiprent.Logic.Queries.UserRoles.Models.ListResponse;

namespace Equiprent.Logic.Queries.UserRoles.Handlers
{
    public class GetPagedListHandler : IQueryHandler<GetPagedUserRolesRequest, ListResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;

        public GetPagedListHandler(ApplicationDbContext dbcontext, ILanguageableService languageableService)
        {
            _dbContext = dbcontext;
            _languageableService = languageableService;
        }

        public async Task<ListResponse?> HandleAsync(GetPagedUserRolesRequest message)
        {
            var roles = _dbContext.UserRoles
                .Where(r => !r.IsDeleted)
                .Select(r =>
                    new UserRoleListItemModel
                    {
                        Id = r.Id
                    })
                .Where(DbStatementBuilder.BuildWhereClause(message.RequestParameters.SearchCriteria ?? string.Empty))
                .OrderBy(DbStatementBuilder.BuildOrderClause(message.RequestParameters.SortColumnName ?? string.Empty, message.RequestParameters.SortOrder));

            var list = await roles
                .Skip(message.RequestParameters.StartRow)
                .Take(message.RequestParameters.PageCount)
                .ToListAsync();

            var userRolesIdsList = list
                .Select(x => x.Id)
                .ToList();

            await _languageableService.TranslateLanguageableValuesAsync<UserRoleListItemModel, UserRoleToLanguage>(
                list,
                idPropertyName: nameof(UserRoleListItemModel.Id),
                namePropertyName: nameof(UserRoleListItemModel.Name));

            var model = new ListResponse
            {
                List = list,
                TotalRowsCount = await roles.CountAsync()
            };

            return model;
        }
    }
}
