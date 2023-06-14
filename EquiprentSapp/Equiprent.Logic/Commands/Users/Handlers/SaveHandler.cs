using Equiprent.ApplicationServices.ApplicationUser;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class SaveHandler : ICommandHandler<SaveMessage>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher _passwordHasher;

        public SaveHandler(ApplicationDbContext dbcontext, IPasswordHasher passwordHasher)
        {
            _dbContext = dbcontext;
            _passwordHasher = passwordHasher;
        }

        public async Task<CommandResult> HandleAsync(SaveMessage message)
        {
            var user = await _dbContext.ApplicationUsers.SingleOrDefaultAsync(x => x.Id == message.Id);

            if (user is not null)
            {
                if (user.UserRoleId != message.UserRoleId)
                {
                    user.IsTokenRefreshRequired = true;
                }

                user.Login = message.Login;
                user.FirstName = message.FirstName;
                user.LastName = message.LastName;
                user.Email = message.Email;
                user.IsActive = message.IsActive;
                user.UserRoleId = message.UserRoleId;

                if (!string.IsNullOrEmpty(message.Password))
                {
                    user.Password = _passwordHasher.GetHash(message.Password);
                }

                _dbContext.ApplicationUsers.Update(user);
                await _dbContext.SaveChangesAsync();

                return CommandResult.OK;
            }

            return CommandResult.BadRequest;
        }
    }
}
