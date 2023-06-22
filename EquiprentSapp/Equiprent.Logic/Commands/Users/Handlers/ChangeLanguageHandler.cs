using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangeLanguageHandler : ICommandHandler<ChangeLanguageRequest>
    {
        private readonly ApplicationDbContext _dbContext;

        public ChangeLanguageHandler(ApplicationDbContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public async Task<CommandResult> HandleAsync(ChangeLanguageRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id);

            if (user is not null)
            {
                if (user.LanguageId != request.LanguageId)
                    user.ChangeRefreshToken();                

                user.LanguageId = request.LanguageId;

                await _dbContext.Users.UpdateAsync(user);

                return CommandResult.OK;
            }

            return CommandResult.BadRequest;
        }
    }
}
