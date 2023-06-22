using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Logic.Commands.UserRoles.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Handlers
{
    public class DeleteHandler : ICommandHandler<DeleteRequest>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userResolverService;

        public DeleteHandler(ApplicationDbContext dbcontext, IUserService userResolverService)
        {
            _dbContext = dbcontext;
            _userResolverService = userResolverService;
        }

        public async Task<CommandResult> HandleAsync(DeleteRequest request)
        {
            var userRole = await _dbContext.UserRoles
                .SingleOrDefaultAsync(r => r.Id == request.Id);

            if (userRole is not null)
            {
                await DeleteUserPermissionsForRoleAsync(userRole.Id);

                await _dbContext.UserRoles.SoftDeleteAsync(userRole);
            }

            return CommandResult.OK;
        }

        public async Task<CommandResult> ValidateAsync(DeleteRequest message)
        {
            var userId = _userResolverService.GetUserId().GetValueOrDefault();

            var userRoleId = await _dbContext.Users
                .Where(u => u.Id == userId)
                .Select(u => u.UserRoleId)
                .SingleOrDefaultAsync();

            if (userRoleId == message.Id)
                return CommandResult.UserRole_TheOnlyAssignedRoleDeletionAttempt;

            var isUserRoleAssigned = await _dbContext.Users
                .Where(u => u.UserRoleId == message.Id)
                .AnyAsync();

            if (isUserRoleAssigned)
                return CommandResult.UserRole_AssignedRoleDeletionAttempt;

            return CommandResult.OK;
        }

        private async Task DeleteUserPermissionsForRoleAsync(int roleId)
        {
            var userPermissionsForRole = await _dbContext.UserPermissionToRoles
                .Where(x => x.UserRoleId == roleId)
                .ToListAsync();

            _dbContext.RemoveRange(userPermissionsForRole);
        }
    }
}
