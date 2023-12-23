using Equiprent.ApplicationImplementations.CommandResults;
using Equiprent.ApplicationInterfaces.Users.Passwords;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.ChangePassword;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangePasswordHandler : ICommandHandler<ChangePasswordRequest>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher _passwordHasher;

        public ChangePasswordHandler(
            ApplicationDbContext dbContext,
            IPasswordHasher passwordHasher)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
        }

        public async Task<CommandResult> HandleAsync(ChangePasswordRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id);

            if (user is null)
                return CommandResult.BadRequest;

            user.Password = _passwordHasher.GetHash(request.Password);

            await _dbContext.Users.UpdateAndSaveAsync(user);

            return CommandResult.OK;
        }

        public async Task<CommandResult> ValidateAsync(ChangePasswordRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id);

            if (user is null)
                return CommandResult.BadRequest;

            if (user.Password.ToLower() != _passwordHasher.GetHash(request.OldPassword).ToLower())
                return CommandResult.User_WrongOldPassword;

            if (string.IsNullOrEmpty(request.Password))
                return CommandResult.BadRequest;

            return CommandResult.OK;
        }
    }
}
