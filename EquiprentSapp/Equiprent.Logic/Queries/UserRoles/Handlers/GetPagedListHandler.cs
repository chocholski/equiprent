using Equiprent.ApplicationServices.Createable;
using Equiprent.ApplicationServices.Languageable;
using Equiprent.Entities.Application;
using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.UserRoles.Messages;
using Equiprent.Logic.Queries.UserRoles.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using static Equiprent.Logic.Queries.UserRoles.Models.ListModel;

namespace Equiprent.Logic.Queries.UserRoles.Handlers
{
    public class GetPagedListHandler : IQueryHandler<GetPagedUserRolesMessage, ListModel>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ICreateableService _createableService;
        private readonly ILanguageableService _languageableService;

        public GetPagedListHandler(ApplicationDbContext dbcontext, ICreateableService createableService, ILanguageableService languageableService)
        {
            _dbContext = dbcontext;
            _createableService = createableService;
            _languageableService = languageableService;
        }

        public async Task<ListModel?> HandleAsync(GetPagedUserRolesMessage message)
        {
            var roles = _dbContext.UserRoles
                .Where(x => !x.IsDeleted)
                .Select(userRole =>
                    new UserRoleListItemModel
                    {
                        Id = userRole.Id
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

            await _languageableService.TranslateLanguageableValuesAsync<UserRoleListItemModel, UserRoleToLanguage>(list,
                idPropertyName: nameof(UserRoleListItemModel.Id),
                namePropertyName: nameof(UserRoleListItemModel.Name));

            var model = new ListModel
            {
                List = list,
                TotalRowsCount = await roles.CountAsync()
            };
            return model;
        }
    }
}
