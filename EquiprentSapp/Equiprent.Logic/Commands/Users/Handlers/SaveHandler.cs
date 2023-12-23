using Equiprent.ApplicationImplementations.CommandResults;
using Equiprent.ApplicationInterfaces.Users;
using Equiprent.ApplicationInterfaces.Users.Passwords;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.Save;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class SaveHandler : ICommandHandler<SaveRequest>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUserService _userService;

        public SaveHandler(
            ApplicationDbContext dbContext,
            IPasswordHasher passwordHasher,
            IUserService userService)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _userService = userService;
        }

        public async Task<CommandResult> HandleAsync(SaveRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id);

            if (user is null || !request.UserRoleId.HasValue)
                return CommandResult.BadRequest;

            if (user.UserRoleId != request.UserRoleId)
                await _userService.SetTokenRefreshRequiredForUsersAsync(new HashSet<Guid>() { user.Id });

            user.Email = request.Email;
            user.FirstName = request.FirstName;
            user.IsActive = request.IsActive;
            user.LastName = request.LastName;
            user.UserRoleId = request.UserRoleId.Value;

            if (!string.IsNullOrEmpty(request.Password))
                user.Password = _passwordHasher.GetHash(request.Password);

            await _dbContext.Users.UpdateAndSaveAsync(user);

            return CommandResult.OK;
        }
    }
}
