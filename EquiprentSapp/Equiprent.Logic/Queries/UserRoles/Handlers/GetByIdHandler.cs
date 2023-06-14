using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Queries.UserRoles.Messages;
using Equiprent.Logic.Queries.UserRoles.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Handlers
{
    public class GetByIdHandler : IQueryHandler<GetUserRoleByIdMessage, DetailsModel>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserPermissionsService _userPermissionsService;
        private readonly IUserService _userResolverService;

        public GetByIdHandler(ApplicationDbContext dbcontext, IUserPermissionsService userPermissionsService, IUserService userResolverService)
        {
            _dbContext = dbcontext;
            _userPermissionsService = userPermissionsService;
            _userResolverService = userResolverService;
        }

        public async Task<DetailsModel?> HandleAsync(GetUserRoleByIdMessage message)
        {
            var userRole = await _dbContext.UserRoles
                .Where(x => !x.IsDeleted)
                .SingleOrDefaultAsync(x => x.Id == message.RoleId);

            if (userRole is not null)
            {
                var allUserPermissions = await _userPermissionsService.GetAllUserPermissionsAsync();
                var userPermissionsForRole = await _userPermissionsService.GetUserPermissionsForRoleAsync(userRole.Id);

                var userPermissionsForRoleList = new List<UserPermissionForUserRoleListItemModel>();
                foreach (var permission in allUserPermissions)
                {
                    userPermissionsForRoleList.Add(new UserPermissionForUserRoleListItemModel
                    {
                        UserPermissionId = permission.Id,
                        SystemName = permission.SystemName,
                        Name = permission.Name,
                        IsSelected = userPermissionsForRole.Contains(permission)
                    });
                }

                var userPermissionsInGroups = userPermissionsForRoleList
                    .GroupBy(permission => permission.SystemName.Split("_")[0])
                    .Select(group => new
                    {
                        GroupName = $"Permissions.{group.Key}",
                        PermissionsList = group.ToList()
                    })
                    .ToList();

                var listGroupModel = new List<UserPermissionsForUserRoleListGroupItemModel>();

                foreach (var group in userPermissionsInGroups)
                {
                    var groupModel = new UserPermissionsForUserRoleListGroupItemModel();

                    groupModel.GroupName = group.GroupName;

                    foreach (var permission in group.PermissionsList)
                    {
                        groupModel.Permissions.Add(new UserPermissionForUserRoleListItemModel
                        {
                            UserPermissionId = permission.UserPermissionId,
                            SystemName = permission.SystemName,
                            Name = permission.Name,
                            IsSelected = permission.IsSelected,
                            LinkedUserPermissions = await GetLinkedUserPermissions(permission.UserPermissionId)
                        });
                    }

                    listGroupModel.Add(groupModel);
                }

                var result = new DetailsModel
                {
                    Id = userRole.Id,
                    UserPermissionsForUserRoleList = listGroupModel
                };

                var currentUserLanguageId = await _userResolverService.GetCurrentUserLanguageIdAsync();

                if (currentUserLanguageId.HasValue)
                {
                    result.NameInLanguages = await _dbContext.UserRolesToLanguages
                    .Where(x => x.UserRoleId == userRole.Id)
                    .Select(y => new NameInLanguage
                    {
                        Name = y.Name,
                        LaguageId = y.LanguageId,
                        LaguageName = y.Language.Name
                    })
                    .ToListAsync();

                    result.Name = result.NameInLanguages
                        .Where(nameInLanguage => nameInLanguage.LaguageId == currentUserLanguageId.Value)
                        .Select(nameInLanguage => nameInLanguage.Name)
                        .FirstOrDefault() ?? string.Empty;
                }

                return result;
            }

            return null;
        }

        private async Task<List<int>> GetLinkedUserPermissions(int userPermissionId)
        {
            var result = new List<int>();

            var linkedUserPermissions = await _dbContext.UserPermissionToUserPermissions
                .Where(permission => permission.UserPermissionId == userPermissionId)
                .Select(permission => permission.LinkedUserPermissionId)
                .ToListAsync();

            if (linkedUserPermissions is not null && linkedUserPermissions.Any())
            {
                result.AddRange(linkedUserPermissions);
            }

            return result;
        }
    }
}
