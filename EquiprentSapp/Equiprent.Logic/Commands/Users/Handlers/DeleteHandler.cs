using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class DeleteHandler : ICommandHandler<DeleteMessage>
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteHandler(ApplicationDbContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public async Task<CommandResult> HandleAsync(DeleteMessage message)
        {
            var user = await _dbContext.ApplicationUsers.SingleOrDefaultAsync(x => x.Id == message.Id);

            if (user is not null)
            {
                user.IsDeleted = true;
                _dbContext.ApplicationUsers.Update(user);

                await _dbContext.SaveChangesAsync();
            }

            return CommandResult.OK;
        }
    }
}
