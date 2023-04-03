using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Queries.Users.Messages;
using Equiprent.Data.Services;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetPagedSelectListHandler : IQueryHandler<GetPagedSelectUsersMessage, SelectListModel>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userResolverService;

        public GetPagedSelectListHandler(ApplicationDbContext dbcontext, IUserService userResolverService)
        {
            _dbContext = dbcontext;
            _userResolverService = userResolverService;
        }

        public async Task<SelectListModel?> HandleAsync(GetPagedSelectUsersMessage message)
        {
            var currentUserLanguageId = await _userResolverService.GetCurrentUserLanguageIdAsync();

            if (currentUserLanguageId.HasValue)
            {
                var userRoles = await _dbContext.UserRolesToLanguages
                .Where(x => x.LanguageId == currentUserLanguageId)
                .Select(x => new
                {
                    UserRoleId = x.UserRoleId,
                    Name = x.Name
                })
                .ToListAsync();

                var users = _dbContext.ApplicationUsers
                    .Include(x => x.UserRole)
                    .Where(y => y.IsActive && !y.IsDeleted)
                    .Select(user =>
                        new ApplicationUserSelectListItemViewModel
                        {
                            Id = user.Id,
                            Login = user.Login,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            UserRoleId = user.UserRoleId
                        })
                    .Where(DbStatementBuilder.BuildWhereClause(message.RequestParameters.SearchCriteria ?? string.Empty));

                if (message.IgnoredUserIds != null && message.IgnoredUserIds.Length > 0)
                    users = users.Where(x => !message.IgnoredUserIds.Contains(x.Id));

                users = users.OrderBy(DbStatementBuilder.BuildOrderClause(message.RequestParameters.SortColumnName ?? string.Empty, message.RequestParameters.SortOrder));

                var list = await users
                    .Skip(message.RequestParameters.StartRow)
                    .Take(message.RequestParameters.PageCount)
                    .ToListAsync();

                list.ForEach(x => x.UserRoleName = userRoles.Where(userRole => userRole.UserRoleId == x.UserRoleId).Select(x => x.Name).SingleOrDefault() ?? string.Empty);

                var model = new SelectListModel
                {
                    List = list,
                    TotalRowsCount = await users.CountAsync()
                };

                return model;
            }

            return null;
        }
    }
}
