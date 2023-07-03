using Equiprent.ApplicationServices.CommandResults;
using Equiprent.ApplicationServices.Users;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class SaveHandler : ICommandHandler<SaveRequest>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUserService _userService;

        public SaveHandler(
            ApplicationDbContext dbcontext,
            IPasswordHasher passwordHasher,
            IUserService userService)
        {
            _dbContext = dbcontext;
            _passwordHasher = passwordHasher;
            _userService = userService;
        }

        public async Task<CommandResult> HandleAsync(SaveRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id);

            if (user is not null)
            {
                if (user.UserRoleId != request.UserRoleId)
                    await _userService.SetTokenRefreshRequiredForUsersAsync(new HashSet<Guid>() { user.Id });

                user.Login = request.Login;
                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.Email = request.Email;
                user.IsActive = request.IsActive;
                user.UserRoleId = request.UserRoleId;

                if (!string.IsNullOrEmpty(request.Password))
                    user.Password = _passwordHasher.GetHash(request.Password);

                await _dbContext.Users.UpdateAsync(user);

                return CommandResult.OK;
            }

            return CommandResult.BadRequest;
        }
    }
}
