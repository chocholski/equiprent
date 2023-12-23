using Equiprent.ApplicationImplementations.CommandResults;
using Equiprent.ApplicationInterfaces.Users;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.ChangeRole;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangeRoleHandler : ICommandHandler<ChangeRoleRequest>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userService;

        public ChangeRoleHandler(
            ApplicationDbContext dbContext,
            IUserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        public async Task<CommandResult> HandleAsync(ChangeRoleRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.UserId);

            if (user is null)
                return CommandResult.BadRequest;

            await _userService.SetTokenRefreshRequiredForUsersAsync(new HashSet<Guid>() { user.Id });

            user.UserRoleId = request.UserRoleId;

            await _dbContext.Users.UpdateAndSaveAsync(user);

            return CommandResult.OK;
        }

        public async Task<CommandResult> ValidateAsync(ChangeRoleRequest request)
        {
            if (request is null)
                return CommandResult.BadRequest;

            var userHasUserRoleChosenAlreadyAssigned = await _dbContext.Users
                .Where(u =>
                    !u.IsDeleted &&
                    u.Id == request.UserId &&
                    u.UserRoleId == request.UserRoleId)
                .AnyAsync();

            if (userHasUserRoleChosenAlreadyAssigned)
                return CommandResult.UserRole_UserHasBeenAlreadyAssignedToRole;

            return CommandResult.OK;
        }
    }
}
