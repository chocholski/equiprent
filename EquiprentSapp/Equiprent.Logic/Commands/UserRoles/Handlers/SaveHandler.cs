using Equiprent.ApplicationServices.CommandResults;
using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Entities.Application;
using Equiprent.Logic.Commands.UserRoles.Requests.Save;
using Equiprent.Logic.Infrastructure.CQRS;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1.Ocsp;

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

            if (request.PermissionsSelected.IsNullOrEmpty())
                return CommandResult.UserRole_NoUserPermissionAssigned;

            return CommandResult.OK;
        }

        public async Task<CommandResult> HandleAsync(SaveRequest request)
        {
            var userRole = await GetUserRoleAsync(request.Id);

            if (userRole is null)
                return CommandResult.BadRequest;

            await UpdateUserRoleToLanguagesAsync(request);
            await UpdateUserRolePermissionsAsync(userRole.Id, request.PermissionsSelected);

            var idsOfUsersWithRoleUpdated = await _dbContext.Users
                .Where(u => u.UserRoleId == userRole.Id)
                .Select(u => u.Id)
                .ToListAsync();

            await _userService.SetTokenRefreshRequiredForUsersAsync(idsOfUsersWithRoleUpdated);

            return CommandResult.OK;
        }

        private async Task<UserRole?> GetUserRoleAsync(int userRoleId)
        {
            return await _dbContext.UserRoles
                .SingleOrDefaultAsync(role => !role.IsDeleted && role.Id == userRoleId);
        }

        private async Task UpdateUserRolePermissionsAsync(int roleId, IEnumerable<PermissionItemModel> userPermissionsFromRequest)
        {
            var currentUserRolePermissions = await _userPermissionsService.GetUserRolePermissionsAsync(roleId);

            var userPermissionsToUserRolesToRemoveIds = currentUserRolePermissions
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
                .Where(model => allUserPermissionsIds.Contains(model.Id))
                .Select(model => model.Id)
                .ToList();

            var userPermissionIdsForRoleBeingUpdated = await AppendPermissionsWithLinkedUserPermissionsAsync(userPermissionIdsFromRequest);

            await _dbContext.UserPermissionToRoles.AddRangeAndSaveAsync(userPermissionIdsForRoleBeingUpdated
                .Select(id => new UserPermissionToRole
                {
                    UserPermissionId = id,
                    UserRoleId = roleId
                }));
        }

        private async Task UpdateUserRoleToLanguagesAsync(SaveRequest request)
        {
            var userRolesToLanguages = await _dbContext.UserRolesToLanguages
                .Where(roleToLanguage => roleToLanguage.UserRoleId == request.Id)
                .ToListAsync();

            _dbContext.UserRolesToLanguages.RemoveRange(userRolesToLanguages);

            _dbContext.UserRolesToLanguages.AddRange(request.NameInLanguages
                .Select(roleInLanguage => new UserRoleToLanguage
                {
                    UserRoleId = request.Id,
                    Name = roleInLanguage.Name,
                    LanguageId = roleInLanguage.LanguageId
                }));
        }

        private async Task<HashSet<int>> AppendPermissionsWithLinkedUserPermissionsAsync(List<int> userPermissionIds)
        {
            var result = new HashSet<int>(userPermissionIds);

            foreach (var id in userPermissionIds)
            {
                var linkedUserPermissionIds = await _userPermissionsService.GetIdsOfPermissionsLinkedToPermissionAsync(id);

                foreach (var linkedUserPermissionId in linkedUserPermissionIds)
                    result.Add(linkedUserPermissionId);
            }

            return result;
        }
    }
}
