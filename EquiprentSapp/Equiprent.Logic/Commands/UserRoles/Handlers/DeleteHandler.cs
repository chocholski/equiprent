using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Logic.Commands.UserRoles.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Handlers
{
    public class DeleteHandler : ICommandHandler<DeleteMessage>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userResolverService;

        public DeleteHandler(ApplicationDbContext dbcontext, IUserService userResolverService)
        {
            _dbContext = dbcontext;
            _userResolverService = userResolverService;
        }

        public async Task<CommandResult> HandleAsync(DeleteMessage message)
        {
            var validationResult = await Validate(message);
            if (validationResult != CommandResult.OK)
            {
                return validationResult;
            }

            var userRole = await _dbContext.UserRoles
                .SingleOrDefaultAsync(x => x.Id == message.Id);

            if (userRole is not null)
            {
                await DeleteUserPermissionsForRole(userRole.Id);

                userRole.IsDeleted = true;
                _dbContext.UserRoles.Update(userRole);
                await _dbContext.SaveChangesAsync();
            }

            return CommandResult.OK;
        }

        private async Task<CommandResult> Validate(DeleteMessage message)
        {
            var userId = _userResolverService.GetUserId().GetValueOrDefault();

            var userRoleId = await _dbContext.ApplicationUsers
                .Where(x => x.Id == userId)
                .Select(y => y.UserRoleId)
                .SingleOrDefaultAsync();

            if (userRoleId == message.Id)
            {
                return CommandResult.Role_TheOnlyAssignedRoleDeletionAttempt;
            }

            var userRoleConnectedToUser = await _dbContext.ApplicationUsers
                .Where(x => x.UserRoleId == message.Id)
                .AnyAsync();

            if (userRoleConnectedToUser)
            {
                return CommandResult.Role_AssignedRoleDeletionAttempt;
            }

            return CommandResult.OK;
        }

        private async Task DeleteUserPermissionsForRole(int roleId)
        {
            var userPermissionsForRole = await _dbContext.UserPermissionToRoles
                    .Where(x => x.UserRoleId == roleId)
                    .ToListAsync();

            userPermissionsForRole.ForEach(x => _dbContext.UserPermissionToRoles.Remove(x));
        }
    }
}
