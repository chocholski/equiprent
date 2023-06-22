using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Queries.Users.Messages;
using Equiprent.Data.Services;
using Equiprent.ApplicationServices.Languageables;
using Equiprent.Entities.Application;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Data.DbContext;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetPagedListHandler : IQueryHandler<GetPagedUsersRequest, ListResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;

        public GetPagedListHandler(ApplicationDbContext dbcontext, ILanguageableService languageableService)
        {
            _dbContext = dbcontext;
            _languageableService = languageableService;
        }

        public async Task<ListResponse?> HandleAsync(GetPagedUsersRequest request)
        {
            var users = _dbContext.Users
                .Include(u => u.UserRole)
                .Where(u => u.IsDeleted ||
                            !request.UserRoleId.HasValue ||
                            u.UserRoleId == request.UserRoleId.Value)
                .Select(u => 
                    new ApplicationUserListItemViewModel
                    {
                        Id = u.Id,
                        FirstName = u.FirstName,
                        LastName = u.LastName,
                        Login = u.Login,
                        UserRoleId = u.UserRoleId,
                        IsActive = u.IsActive
                    })
                .Where(DbStatementBuilder.BuildWhereClause(request.RequestParameters.SearchCriteria ?? string.Empty))
                .OrderBy(DbStatementBuilder.BuildOrderClause(request.RequestParameters.SortColumnName ?? string.Empty, request.RequestParameters.SortOrder));

            var list = await users
                .Skip(request.RequestParameters.StartRow)
                .Take(request.RequestParameters.PageCount)
                .ToListAsync();

            await _languageableService.TranslateLanguageableValuesAsync<ApplicationUserListItemViewModel, UserRoleToLanguage>(
                list,
                idPropertyName: nameof(ApplicationUserListItemViewModel.UserRoleId),
                namePropertyName: nameof(ApplicationUserListItemViewModel.UserRoleName));

            var model = new ListResponse
            {
                List = list,
                TotalRowsCount = await users.CountAsync()
            };

            return model;
        }
    }
}
