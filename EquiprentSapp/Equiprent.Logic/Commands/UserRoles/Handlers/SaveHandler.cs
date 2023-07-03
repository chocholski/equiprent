using Equiprent.ApplicationServices.CommandResults;
using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Entities.Application;
using Equiprent.Logic.Commands.UserRoles.Messages;
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
            ApplicationDbContext dbcontext,
            IUserService userService,
            IUserPermissionService userPermissionsService)
        {
            _dbContext = dbcontext;
            _userService = userService;
            _userPermissionsService = userPermissionsService;
        }

        public async Task<CommandResult> HandleAsync(SaveRequest request)
        {
            var userRole = await _dbContext.UserRoles
                .SingleOrDefaultAsync(r => r.Id == request.Id);

            if (userRole is not null)
            {
                var userRolesToLanguages = await _dbContext.UserRolesToLanguages
                    .Where(x => x.UserRoleId == userRole.Id)
                    .ToListAsync();

                _dbContext.UserRolesToLanguages.RemoveRange(userRolesToLanguages);

                await UpdateUserPermissionsForRoleAsync(userRole.Id, request.UserPermissionsForUserRoleList);

                await _dbContext.UserRolesToLanguages.AddAndSaveRangeAsync(request.NameInLanguages
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

            return CommandResult.BadRequest;
        }

        public async Task<CommandResult> ValidateAsync(SaveRequest request)
        {
            if (request is null)
                return CommandResult.BadRequest;

            var userRoleExists = false;

            foreach (var userRole in request.NameInLanguages)
            {
                var existingUserRolesInLanguage = await _dbContext.UserRolesToLanguages
                    .Where(x => x.LanguageId == userRole.LanguageId)
                    .ToListAsync();

                var userRoleWithSameNameExists = existingUserRolesInLanguage
                    .Where(r => r.Name == userRole.Name &&
                                r.UserRoleId != request.Id)
                    .Any();

                if (userRoleWithSameNameExists)
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

        private async Task UpdateUserPermissionsForRoleAsync(int roleId, IEnumerable<UserPermissionsForUserRoleListItemModel> userPermissionsFromRequest)
        {
            var currentPermissions = await _userPermissionsService.GetUserPermissionsForRoleAsync(roleId);

            var userPermissionsToUserRolesToRemoveIds = currentPermissions
                .Select(p => p.Id)
                .ToList();

            var userPermissionsToUserRolesToRemove = await _dbContext.UserPermissionToRoles
                .Where(x => userPermissionsToUserRolesToRemoveIds.Contains(x.UserPermissionId) &&
                            x.UserRoleId == roleId)
                .ToListAsync();

            await _dbContext.UserPermissionToRoles.RemoveRangeAsync(userPermissionsToUserRolesToRemove);

            var allUserPermissions = await _userPermissionsService
                .GetAllUserPermissionsAsync();

            var allUserPermissionsIds = allUserPermissions
                .Select(p => p.Id)
                .ToList();

            var userPermissionIdsFromRequest = userPermissionsFromRequest
                .Where(x => x.IsSelected &&
                            allUserPermissionsIds.Contains(x.UserPermissionId))
                .Select(x => x.UserPermissionId)
                .ToHashSet();

            userPermissionIdsFromRequest = await AppendserPermissionsWithLinkedUserPermissionsIfNecessaryAsync(userPermissionIdsFromRequest);

            await _dbContext.UserPermissionToRoles.AddAndSaveRangeAsync(userPermissionsFromRequest
                .Select(p => new UserPermissionToRole
                {
                    UserPermissionId = p.UserPermissionId,
                    UserRoleId = roleId
                }));
        }

        private async Task<HashSet<int>> AppendserPermissionsWithLinkedUserPermissionsIfNecessaryAsync(HashSet<int> userPermissionIds)
        {
            var result = new HashSet<int>(userPermissionIds);

            foreach (var id in userPermissionIds)
            {
                var linkedUserPermissionIds = await _userPermissionsService.GetAllLinkedPermissionsIdsAsync(id);

                foreach (var linkedUserPermissionId in linkedUserPermissionIds)
                {
                    if (!result.Contains(linkedUserPermissionId))
                        result.Add(linkedUserPermissionId);
                }
            }

            return result;
        }
    }
}
