using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangeLanguageHandler : ICommandHandler<ChangeLanguageMessage>
    {
        private readonly ApplicationDbContext _dbContext;

        public ChangeLanguageHandler(ApplicationDbContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public async Task<CommandResult> HandleAsync(ChangeLanguageMessage message)
        {
            var user = await _dbContext.ApplicationUsers.SingleOrDefaultAsync(x => x.Id == message.Id);

            if (user is not null)
            {
                if (user.LanguageId != message.LanguageId)
                {
                    user.IsTokenRefreshRequired = true;
                }

                user.LanguageId = message.LanguageId;

                _dbContext.ApplicationUsers.Update(user);
                await _dbContext.SaveChangesAsync();

                return CommandResult.OK;
            }

            return CommandResult.BadRequest;
        }
    }
}
