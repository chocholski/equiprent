using Equiprent.ApplicationServices.ApplicationUser;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangePasswordHandler : ICommandHandler<ChangePasswordMessage>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher _passwordHasher;

        public ChangePasswordHandler(ApplicationDbContext dbcontext, IPasswordHasher passwordHasher)
        {
            _dbContext = dbcontext;
            _passwordHasher = passwordHasher;
        }

        public async Task<CommandResult> HandleAsync(ChangePasswordMessage message)
        {
            var user = await _dbContext.ApplicationUsers.SingleOrDefaultAsync(x => x.Id == message.Id);
            if (user != null)
            {
                if (user.Password.ToLower() != _passwordHasher.GetHash(message.OldPassword).ToLower())
                    return CommandResult.User_WrongOldPassword;

                if (string.IsNullOrEmpty(message.Password))
                    return CommandResult.BadRequest;

                user.Password = _passwordHasher.GetHash(message.Password);

                _dbContext.ApplicationUsers.Update(user);
                await _dbContext.SaveChangesAsync();

                return CommandResult.OK;
            }

            return CommandResult.BadRequest;
        }
    }
}
