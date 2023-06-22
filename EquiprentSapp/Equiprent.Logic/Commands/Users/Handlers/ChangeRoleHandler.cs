using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangeRoleHandler : ICommandHandler<ChangeRoleRequest>
    {
        private readonly ApplicationDbContext _dbContext;

        public ChangeRoleHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult> HandleAsync(ChangeRoleRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.UserId);

            if (user is not null)
            {
                user.UserRoleId = request.UserRoleId;

                user.ChangeRefreshToken();

                await _dbContext.Users.UpdateAsync(user);

                return CommandResult.OK;
            }

            return CommandResult.BadRequest;
        }

        public async Task<CommandResult> ValidateAsync(ChangeRoleRequest request)
        {
            if (request is null)
                return CommandResult.BadRequest;

            var userHasUserRoleChosenAlreadyAssigned = await _dbContext.Users
                .Where(u => !u.IsDeleted &&
                            u.Id == request.UserId &&
                            u.UserRoleId == request.UserRoleId)
                .AnyAsync();

            if (userHasUserRoleChosenAlreadyAssigned)
                return CommandResult.UserRole_UserHasBeenAlreadyAssignedToRole;

            return CommandResult.OK;
        }
    }
}
