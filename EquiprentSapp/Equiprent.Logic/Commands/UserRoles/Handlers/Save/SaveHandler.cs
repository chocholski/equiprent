using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Identities.Tokens;
using Equiprent.ApplicationInterfaces.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.UserPermissionToRoles;
using Equiprent.Entities.Application.UserRoles;
using Equiprent.Entities.Application.UserRoleToLanguages;
using Equiprent.Extensions;
using Equiprent.Logic.Commands.UserRoles.Requests.Save;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.UserRoles.Handlers.Save
{
    public class SaveHandler : IRequestHandler<SaveRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ITokenRefreshService _tokenRefreshService;
        private readonly IUserPermissionService _userPermissionsService;

        public SaveHandler(
            ApplicationDbContext dbContext,
            ITokenRefreshService tokenRefreshService,
            IUserPermissionService userPermissionsService)
        {
            _dbContext = dbContext;
            _tokenRefreshService = tokenRefreshService;
            _userPermissionsService = userPermissionsService;
        }

        public async Task<CommandResult> Handle(SaveRequest request, CancellationToken cancellationToken)
        {
            var userRole = await GetUserRoleAsync(request.Id, cancellationToken);

            if (userRole is null)
                return CommandResult.BadRequest;

            await UpdateUserRoleToLanguagesAsync(request, cancellationToken);
            await UpdateUserRolePermissionsAsync(userRole.Id, request.PermissionsSelected, cancellationToken);

            var idsOfUsersWithRoleUpdated = await _dbContext.Users
                .Where(u => u.UserRoleId == userRole.Id)
                .Select(u => u.Id)
                .ToListAsync(cancellationToken);

            await _tokenRefreshService.SetTokenRefreshRequiredForUsersAsync(idsOfUsersWithRoleUpdated, cancellationToken);

            return CommandResult.OK;
        }

        private async Task<UserRole?> GetUserRoleAsync(int userRoleId, CancellationToken cancellationToken = default)
        {
            return await _dbContext.UserRoles
                .SingleOrDefaultAsync(role => !role.IsDeleted && role.Id == userRoleId, cancellationToken);
        }

        private async Task UpdateUserRolePermissionsAsync(
            int roleId,
            IEnumerable<PermissionItemModel> userPermissionsFromRequest,
            CancellationToken cancellationToken)
        {
            var currentUserRolePermissions = await _userPermissionsService.GetUserRolePermissionsAsync(roleId, cancellationToken);
            var currentUserRolePermissionIds = currentUserRolePermissions.Select(p => p.Id);
            var userPermissionsFromRequestIds = userPermissionsFromRequest.Select(p => p.Id);

            await RemovePermissionsAsync(currentUserRolePermissionIds, userPermissionsFromRequestIds, roleId, cancellationToken);
            await AddPermissionsAsync(currentUserRolePermissionIds, userPermissionsFromRequestIds, roleId, cancellationToken);
        }

        private async Task AddPermissionsAsync(IEnumerable<int> currentUserRolePermissionIds, IEnumerable<int> userPermissionsFromRequestIds, int roleId, CancellationToken cancellationToken = default)
        {
            var userPermissionsToUserRolesToAddIds = userPermissionsFromRequestIds.Except(currentUserRolePermissionIds);
            if (userPermissionsToUserRolesToAddIds.IsNullOrEmpty())
                return;

            var allUserPermissionIds = (await _userPermissionsService
                .GetAllUserPermissionsAsync(cancellationToken))
                .Select(p => p.Id);

            var userPermissionIdsFromRequest = userPermissionsToUserRolesToAddIds
                .Where(permissionId => allUserPermissionIds.Contains(permissionId))
                .ToList();

            var userPermissionIdsForRoleBeingUpdated = await _userPermissionsService
                .AppendPermissionsWithLinkedUserPermissionsAsync(userPermissionIdsFromRequest, cancellationToken);

            await _dbContext.UserPermissionToRoles.AddRangeAndSaveAsync(userPermissionIdsForRoleBeingUpdated
                .Select(id => new UserPermissionToRole
                {
                    UserPermissionId = id,
                    UserRoleId = roleId
                }),
                cancellationToken);
        }

        private async Task RemovePermissionsAsync(IEnumerable<int> currentUserRolePermissionIds, IEnumerable<int> userPermissionsFromRequestIds, int roleId, CancellationToken cancellationToken = default)
        {
            var userPermissionsToUserRolesToRemoveIds = currentUserRolePermissionIds.Except(userPermissionsFromRequestIds);
            if (userPermissionsToUserRolesToRemoveIds.IsNullOrEmpty())
                return;

            var userPermissionsToUserRolesToRemove = await _dbContext.UserPermissionToRoles
                .Where(permissionToRole =>
                    userPermissionsToUserRolesToRemoveIds.Contains(permissionToRole.UserPermissionId) &&
                    permissionToRole.UserRoleId == roleId)
                .ToListAsync(cancellationToken);

            await _dbContext.UserPermissionToRoles.RemoveRangeAndSaveAsync(userPermissionsToUserRolesToRemove, cancellationToken);
        }

        private async Task UpdateUserRoleToLanguagesAsync(SaveRequest request, CancellationToken cancellationToken = default)
        {
            var userRolesToLanguages = await _dbContext.UserRolesToLanguages
                .Where(roleToLanguage => roleToLanguage.UserRoleId == request.Id)
                .ToListAsync(cancellationToken);

            _dbContext.UserRolesToLanguages.RemoveRange(userRolesToLanguages);

            _dbContext.UserRolesToLanguages.AddRange(request.NameInLanguages
                .Select(roleInLanguage => new UserRoleToLanguage
                {
                    UserRoleId = request.Id,
                    Name = roleInLanguage.Name,
                    LanguageId = roleInLanguage.LanguageId
                }));
        }
    }
}
