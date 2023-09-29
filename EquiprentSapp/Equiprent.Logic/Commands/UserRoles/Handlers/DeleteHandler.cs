using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Logic.Commands.UserRoles.Requests.Delete;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Handlers
{
    public class DeleteHandler : ICommandHandler<DeleteRequest>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userResolverService;

        public DeleteHandler(
            ApplicationDbContext dbContext,
            IUserService userResolverService)
        {
            _dbContext = dbContext;
            _userResolverService = userResolverService;
        }

        public async Task<CommandResult> HandleAsync(DeleteRequest request)
        {
            var userRole = await _dbContext.UserRoles
                .SingleOrDefaultAsync(role => role.Id == request.Id);

            if (userRole is null)
                return CommandResult.BadRequest;

            await DeleteUserRolePermissionsAsync(userRole.Id);

            await _dbContext.UserRoles.SoftDeleteAndSaveAsync(userRole);

            return CommandResult.OK;
        }

        public async Task<CommandResult> ValidateAsync(DeleteRequest message)
        {
            var userId = _userResolverService.GetUserId();

            if (!userId.HasValue)
                return CommandResult.BadRequest;

            var userRoleId = await _dbContext.Users
                .Where(u => u.Id == userId)
                .Select(u => u.UserRoleId)
                .SingleOrDefaultAsync();

            if (userRoleId == message.Id)
                return CommandResult.UserRole_TheOnlyAssignedRoleDeletionAttempt;

            var isUserRoleAssigned = await _dbContext.Users
                .AnyAsync(u => u.UserRoleId == message.Id);

            if (isUserRoleAssigned)
                return CommandResult.UserRole_AssignedRoleDeletionAttempt;

            return CommandResult.OK;
        }

        private async Task DeleteUserRolePermissionsAsync(int roleId)
        {
            var userRolePermissions = await _dbContext.UserPermissionToRoles
                .Where(permissionToRole => permissionToRole.UserRoleId == roleId)
                .ToListAsync();

            await _dbContext.UserPermissionToRoles.RemoveRangeAndSaveAsync(userRolePermissions);
        }
    }
}
