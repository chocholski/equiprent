using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Queries.UserRoles.Messages;
using Equiprent.Logic.Queries.UserRoles.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Handlers
{
    public class GetByIdHandler : IQueryHandler<GetUserRoleByIdRequest, DetailsResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserPermissionService _userPermissionsService;
        private readonly IUserService _userResolverService;

        public GetByIdHandler(ApplicationDbContext dbcontext, IUserPermissionService userPermissionsService, IUserService userResolverService)
        {
            _dbContext = dbcontext;
            _userPermissionsService = userPermissionsService;
            _userResolverService = userResolverService;
        }

        public async Task<DetailsResponse?> HandleAsync(GetUserRoleByIdRequest request)
        {
            var userRole = await _dbContext.UserRoles
                .SingleOrDefaultAsync(r => !r.IsDeleted && r.Id == request.RoleId);

            if (userRole is not null)
            {
                var allUserPermissions = await _userPermissionsService.GetAllUserPermissionsAsync();
                var userPermissionsForRole = await _userPermissionsService.GetUserPermissionsForRoleAsync(userRole.Id);

                var userPermissionsForRoleList = new List<UserPermissionForUserRoleListItemModel>(
                    allUserPermissions
                        .Select(p => new UserPermissionForUserRoleListItemModel
                        {
                            UserPermissionId = p.Id,
                            SystemName = p.SystemName,
                            Name = p.Name,
                            IsSelected = userPermissionsForRole.Contains(p)
                        }));

                var userPermissionsInGroups = userPermissionsForRoleList
                    .GroupBy(p => p.SystemName.Split("_")[0])
                    .Select(g => new
                    {
                        GroupName = $"Permissions.{g.Key}",
                        PermissionsList = g.ToList()
                    })
                    .ToList();

                var listGroupModel = new List<UserPermissionsForUserRoleListGroupItemModel>();

                foreach (var group in userPermissionsInGroups)
                {
                    var groupModel = new UserPermissionsForUserRoleListGroupItemModel
                    {
                        GroupName = group.GroupName
                    };

                    foreach (var permission in group.PermissionsList)
                    {
                        groupModel.Permissions.Add(new UserPermissionForUserRoleListItemModel
                        {
                            UserPermissionId = permission.UserPermissionId,
                            SystemName = permission.SystemName,
                            Name = permission.Name,
                            IsSelected = permission.IsSelected,
                            LinkedUserPermissions = await _userPermissionsService.GetAllLinkedPermissionsIdsAsync(permission.UserPermissionId)
                        });
                    }

                    listGroupModel.Add(groupModel);
                }

                var result = new DetailsResponse
                {
                    Id = userRole.Id,
                    UserPermissionsForUserRoleList = listGroupModel
                };

                var currentUserLanguageId = await _userResolverService.GetCurrentUserLanguageIdAsync();

                if (currentUserLanguageId.HasValue)
                {
                    result.NameInLanguages = await _dbContext.UserRolesToLanguages
                        .Where(x => x.UserRoleId == userRole.Id)
                        .Select(x => new NameInLanguage(x.Name, x.LanguageId, x.Language.Name))
                        .ToListAsync();

                    result.Name = result.NameInLanguages
                        .Where(x => x.LanguageId == currentUserLanguageId.Value)
                        .Select(x => x.Name)
                        .FirstOrDefault()
                        ??
                        string.Empty;
                }

                return result;
            }

            return null;
        }
    }
}
