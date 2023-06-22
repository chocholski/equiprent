using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Queries.Users.Messages;
using Equiprent.Data.Services;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Data.DbContext;
using Equiprent.ApplicationServices.Languageables;
using Equiprent.Entities.Application;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetPagedSelectListHandler : IQueryHandler<GetPagedSelectUsersRequest, SelectListResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userResolverService;
        private readonly ILanguageableService _languageableService;

        public GetPagedSelectListHandler(ApplicationDbContext dbcontext, IUserService userResolverService, ILanguageableService languageableService)
        {
            _dbContext = dbcontext;
            _userResolverService = userResolverService;
            _languageableService = languageableService;
        }

        public async Task<SelectListResponse?> HandleAsync(GetPagedSelectUsersRequest request)
        {
            var currentUserLanguageId = await _userResolverService.GetCurrentUserLanguageIdAsync();

            if (currentUserLanguageId.HasValue)
            {
                var users = _dbContext.Users
                    .Include(u => u.UserRole)
                    .Where(u => u.IsActive && !u.IsDeleted)
                    .Select(u =>
                        new ApplicationUserSelectListItemViewModel
                        {
                            Id = u.Id,
                            Login = u.Login,
                            FirstName = u.FirstName,
                            LastName = u.LastName,
                            UserRoleId = u.UserRoleId
                        })
                    .Where(DbStatementBuilder.BuildWhereClause(request.RequestParameters.SearchCriteria ?? string.Empty));

                if (request.IgnoredUserIds is not null && request.IgnoredUserIds.Any())
                    users = users.Where(u => !request.IgnoredUserIds.Contains(u.Id));

                users = users.OrderBy(DbStatementBuilder.BuildOrderClause(request.RequestParameters.SortColumnName ?? string.Empty, request.RequestParameters.SortOrder));

                var list = await users
                    .Skip(request.RequestParameters.StartRow)
                    .Take(request.RequestParameters.PageCount)
                    .ToListAsync();

                await _languageableService.TranslateLanguageableValuesAsync<ApplicationUserSelectListItemViewModel, UserRoleToLanguage>(
                    list,
                    idPropertyName: nameof(ApplicationUserSelectListItemViewModel.UserRoleId),
                    namePropertyName: nameof(ApplicationUserSelectListItemViewModel.UserRoleName));

                var model = new SelectListResponse
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
