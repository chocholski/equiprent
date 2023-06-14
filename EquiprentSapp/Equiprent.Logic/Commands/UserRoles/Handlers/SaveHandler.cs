using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application;
using Equiprent.Logic.Commands.UserRoles.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Handlers
{
    public class SaveHandler : ICommandHandler<SaveMessage>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserPermissionsService _userPermissionsService;

        public SaveHandler(ApplicationDbContext dbcontext, IUserPermissionsService userPermissionsService)
        {
            _dbContext = dbcontext;
            _userPermissionsService = userPermissionsService;
        }

        public async Task<CommandResult> HandleAsync(SaveMessage message)
        {
            var userRole = await _dbContext.UserRoles.SingleOrDefaultAsync(x => x.Id == message.Id);
            if (userRole is not null)
            {
                var validationResult = await Validate(message);
                if (validationResult != CommandResult.OK)
                {
                    return validationResult;
                }

                var userRolesToLanguages = await _dbContext.UserRolesToLanguages
                    .Where(x => x.UserRoleId == userRole.Id)
                    .ToListAsync();

                _dbContext.UserRolesToLanguages.RemoveRange(userRolesToLanguages);

                await UpdateUserPermissionsForRole(userRole.Id, message.UserPermissionsForUserRoleList);

                foreach (var item in message.NameInLanguages)
                {
                    _dbContext.UserRolesToLanguages.Add(new UserRoleToLanguage
                    {
                        UserRoleId = userRole.Id,
                        Name = item.Name,
                        LanguageId = item.LaguageId
                    });
                }

                var users = await _dbContext.ApplicationUsers
                    .Where(x => x.UserRoleId == userRole.Id)
                    .ToListAsync();

                foreach (var user in users)
                {
                    user.IsTokenRefreshRequired = true;
                    _dbContext.ApplicationUsers.Update(user);
                }

                await _dbContext.SaveChangesAsync();

                return CommandResult.OK;
            }
            return CommandResult.BadRequest;
        }

        private async Task<CommandResult> Validate(SaveMessage message)
        {
            if (message is null)
            {
                return CommandResult.BadRequest;
            }

            var roleWithSameDataExists = false;

            foreach (var userRole in message.NameInLanguages)
            {
                var existingUserRolesInLanguage = await _dbContext.UserRolesToLanguages
                    .Where(x => x.LanguageId == userRole.LaguageId)
                    .ToListAsync();

                var roleWithSameNameExists = existingUserRolesInLanguage
                    .Where(x => x.Name == userRole.Name &&
                                x.UserRoleId != message.Id)
                    .Any();

                if (roleWithSameNameExists)
                {
                    roleWithSameDataExists = true;
                    break;
                }
            }

            if (roleWithSameDataExists)
            {
                return CommandResult.Role_ExistsInDatabase;
            }

            if (message.UserPermissionsForUserRoleList is null || 
                !message.UserPermissionsForUserRoleList.Any())
            {
                return CommandResult.Role_NoUserPermissionAssigned;
            }

            return CommandResult.OK;
        }

        private async Task UpdateUserPermissionsForRole(int roleId, List<UserPermissionsForUserRoleListItemModel> userPermissionsFromMessage)
        {
            var permissionsForUser = new List<UserPermissionToRole>();
            var currentPermissionsForUser = await _userPermissionsService.GetUserPermissionsForRoleAsync(roleId);

            var userPermissionsToUserRolesToRemoveIds = currentPermissionsForUser
                .Select(x => x.Id)
                .ToList();

            var userPermissionsToUserRolesToRemove = await _dbContext.UserPermissionToRoles
                .Where(x => userPermissionsToUserRolesToRemoveIds.Contains(x.UserPermissionId) &&
                            x.UserRoleId == roleId)
                .ToListAsync();

            userPermissionsToUserRolesToRemove.ForEach(x => _dbContext.UserPermissionToRoles.Remove(x));

            await _dbContext.SaveChangesAsync();

            var allUserPermissions = await _userPermissionsService
                .GetAllUserPermissionsAsync();

            var allUserPermissionsIds = allUserPermissions
                .Select(x => x.Id)
                .ToList();

            var userPermissionIdsFromMessage = userPermissionsFromMessage
                .Where(x => x.IsSelected &&
                            allUserPermissionsIds.Contains(x.UserPermissionId))
                .Select(x => x.UserPermissionId)
                .ToList();

            userPermissionIdsFromMessage = await AppendWithLinkedUserPermissionsIfNecessary(userPermissionIdsFromMessage);

            foreach (var permission in userPermissionsFromMessage)
            {
                _dbContext.UserPermissionToRoles.Add(new UserPermissionToRole
                {
                    UserPermissionId = permission.UserPermissionId,
                    UserRoleId = roleId
                });
            }
        }

        private async Task<List<int>> AppendWithLinkedUserPermissionsIfNecessary(List<int> userPermissionIds)
        {
            var resultPermissionIds = new List<int>();

            resultPermissionIds.AddRange(userPermissionIds);

            foreach (var id in userPermissionIds)
            {
                var linkedUserPermissionIds = await _userPermissionsService.GetAllLinkedPermissionsIdsAsync(id);

                foreach (var linkedUserPermissionId in linkedUserPermissionIds)
                {
                    if (!userPermissionIds.Contains(linkedUserPermissionId))
                    {
                        resultPermissionIds.Add(linkedUserPermissionId);
                    }
                }
            }

            var result = resultPermissionIds.Distinct().ToList();

            return result;
        }
    }
}
