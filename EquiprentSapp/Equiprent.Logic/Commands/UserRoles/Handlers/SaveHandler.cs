using Equiprent.ApplicationServices.CommandResults;
using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Entities.Application;
using Equiprent.Logic.Commands.UserRoles.Requests.Save;
using Equiprent.Logic.Infrastructure.CQRS;
using Microsoft.IdentityModel.Tokens;

namespace Equiprent.Logic.Commands.UserRoles.Handlers
{
    public class SaveHandler : ICommandHandler<SaveRequest>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userService;
        private readonly IUserPermissionService _userPermissionsService;

        public SaveHandler(
            ApplicationDbContext dbContext,
            IUserService userService,
            IUserPermissionService userPermissionsService)
        {
            _dbContext = dbContext;
            _userService = userService;
            _userPermissionsService = userPermissionsService;
        }

        public async Task<CommandResult> HandleAsync(SaveRequest request)
        {
            var userRole = await _dbContext.UserRoles
                .SingleOrDefaultAsync(role => role.Id == request.Id);

            if (userRole is null)
                return CommandResult.BadRequest;

            var userRolesToLanguages = await _dbContext.UserRolesToLanguages
                .Where(roleToLanguage => roleToLanguage.UserRoleId == userRole.Id)
                .ToListAsync();

            await _dbContext.UserRolesToLanguages.RemoveRangeAndSaveAsync(userRolesToLanguages);

            await UpdateUserRolePermissionsAsync(userRole.Id, request.UserPermissionsForUserRoleList);

            await _dbContext.UserRolesToLanguages.AddRangeAndSaveAsync(request.NameInLanguages
                .Select(x => new UserRoleToLanguage
                {
                    UserRoleId = userRole.Id,
                    Name = x.Name,
                    LanguageId = x.LanguageId
                }));

            var users = await _dbContext.Users
                .Where(u => u.UserRoleId == userRole.Id)
                .ToListAsync();

            await _userService.SetTokenRefreshRequiredForUsersAsync(users.Select(u => u.Id));

            return CommandResult.OK;
        }

        public async Task<CommandResult> ValidateAsync(SaveRequest request)
        {
            if (request is null)
                return CommandResult.BadRequest;

            var userRoleExists = false;

            foreach (var userRole in request.NameInLanguages)
            {
                var existingUserRolesInLanguage = await _dbContext.UserRolesToLanguages
                    .Where(roleToLanguage => roleToLanguage.LanguageId == userRole.LanguageId)
                    .ToListAsync();

                var equallyNamedUserRoleExists = existingUserRolesInLanguage
                    .Where(existingRole =>
                        existingRole.Name == userRole.Name &&
                        existingRole.UserRoleId != request.Id)
                    .Any();

                if (equallyNamedUserRoleExists)
                {
                    userRoleExists = true;

                    break;
                }
            }

            if (userRoleExists)
                return CommandResult.UserRole_ExistsInDatabase;

            if (request.UserPermissionsForUserRoleList.IsNullOrEmpty())
                return CommandResult.UserRole_NoUserPermissionAssigned;

            return CommandResult.OK;
        }

        private async Task UpdateUserRolePermissionsAsync(int roleId, IEnumerable<UserRolePermissionsListItemModel> userPermissionsFromRequest)
        {
            var currentPermissions = await _userPermissionsService.GetUserRolePermissionsAsync(roleId);

            var userPermissionsToUserRolesToRemoveIds = currentPermissions
                .Select(p => p.Id)
                .ToList();

            var userPermissionsToUserRolesToRemove = await _dbContext.UserPermissionToRoles
                .Where(permissionToRole =>
                    userPermissionsToUserRolesToRemoveIds.Contains(permissionToRole.UserPermissionId) &&
                    permissionToRole.UserRoleId == roleId)
                .ToListAsync();

            await _dbContext.UserPermissionToRoles.RemoveRangeAndSaveAsync(userPermissionsToUserRolesToRemove);

            var allUserPermissions = await _userPermissionsService
                .GetAllUserPermissionsAsync();

            var allUserPermissionsIds = allUserPermissions
                .Select(p => p.Id)
                .ToList();

            var userPermissionIdsFromRequest = userPermissionsFromRequest
                .Where(model =>
                    model.IsSelected &&
                    allUserPermissionsIds.Contains(model.UserPermissionId))
                .Select(model => model.UserPermissionId)
                .ToList();

            userPermissionIdsFromRequest = await AppendPermissionsWithLinkedUserPermissionsAsync(userPermissionIdsFromRequest);

            await _dbContext.UserPermissionToRoles.AddRangeAndSaveAsync(userPermissionsFromRequest
                .Select(p => new UserPermissionToRole
                {
                    UserPermissionId = p.UserPermissionId,
                    UserRoleId = roleId
                }));
        }

        private async Task<List<int>> AppendPermissionsWithLinkedUserPermissionsAsync(List<int> userPermissionIds)
        {
            var result = userPermissionIds;

            foreach (var id in userPermissionIds)
            {
                var linkedUserPermissionIds = await _userPermissionsService.GetAllLinkedPermissionsIdsAsync(id);

                result.AddRange(linkedUserPermissionIds.Where(id => !result.Contains(id)));
            }

            return result.Distinct().ToList();
        }
    }
}
