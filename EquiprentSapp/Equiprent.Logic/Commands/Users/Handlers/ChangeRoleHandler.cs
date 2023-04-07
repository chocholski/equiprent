using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangeRoleHandler : ICommandHandler<ChangeRoleMessage>
    {
        private readonly ApplicationDbContext _dbContext;

        public ChangeRoleHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult> HandleAsync(ChangeRoleMessage message)
        {
            var validationResult = await Validate(message);

            if (validationResult is not CommandResult.OK)
            {
                return validationResult;
            }

            var user = await _dbContext.ApplicationUsers
                .Where(user => !user.IsDeleted &&
                               user.Id == message.UserId)
                .SingleOrDefaultAsync();

            if (user is not null)
            {
                user.UserRoleId = message.UserRoleId;
                user.IsTokenRefreshRequired = true;

                _dbContext.ApplicationUsers.Update(user);

                await _dbContext.SaveChangesAsync();
                return CommandResult.OK;
            }

            return CommandResult.BadRequest;
        }

        private async Task<CommandResult> Validate(ChangeRoleMessage message)
        {
            if (message is null)
            {
                return CommandResult.BadRequest;
            }

            var userHasUserRoleChosenAlreadyAssigned = await _dbContext.ApplicationUsers
                .Where(user => !user.IsDeleted &&
                               user.Id == message.UserId &&
                               user.UserRoleId == message.UserRoleId)
                .AnyAsync();

            if (userHasUserRoleChosenAlreadyAssigned)
            {
                return CommandResult.UserRole_UserHasBeenAlreadyAssignedToRole;
            }

            return CommandResult.OK;
        }
    }
}
