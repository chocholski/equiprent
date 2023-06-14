using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Queries.Users.Messages;
using Equiprent.Data.Services;
using Equiprent.ApplicationServices.Languageable;
using Equiprent.Entities.Application;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Data.DbContext;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetPagedListHandler : IQueryHandler<GetPagedUsersMessage, ListModel>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userResolverService;
        private readonly ILanguageableService _languageableService;

        public GetPagedListHandler(ApplicationDbContext dbcontext, IUserService userResolverService, ILanguageableService languageableService)
        {
            _dbContext = dbcontext;
            _userResolverService = userResolverService;
            _languageableService = languageableService;
        }

        public async Task<ListModel?> HandleAsync(GetPagedUsersMessage message)
        {
            var users = _dbContext.ApplicationUsers
                .Include(x => x.UserRole)
                .Where(user => user.IsDeleted ||
                               !message.UserRoleId.HasValue ||
                               user.UserRoleId == message.UserRoleId.Value)
                .Select(user => 
                    new ApplicationUserListItemViewModel
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Login = user.Login,
                        UserRoleId = user.UserRoleId,
                        IsActive = user.IsActive
                    })
                .Where(DbStatementBuilder.BuildWhereClause(message.RequestParameters.SearchCriteria ?? string.Empty))
                .OrderBy(DbStatementBuilder.BuildOrderClause(message.RequestParameters.SortColumnName ?? string.Empty, message.RequestParameters.SortOrder));

            var list = await users
                .Skip(message.RequestParameters.StartRow)
                .Take(message.RequestParameters.PageCount)
                .ToListAsync();

            await _languageableService.TranslateLanguageableValuesAsync<ApplicationUserListItemViewModel, UserRoleToLanguage>(list,
                idPropertyName: nameof(ApplicationUserListItemViewModel.UserRoleId),
                namePropertyName: nameof(ApplicationUserListItemViewModel.UserRoleName));

            var model = new ListModel
            {
                List = list,
                TotalRowsCount = await users.CountAsync()
            };

            return model;
        }
    }
}
