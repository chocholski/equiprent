using Equiprent.ApplicationImplementations.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.Delete;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class DeleteHandler : ICommandHandler<DeleteRequest>
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult> HandleAsync(DeleteRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id);

            if (user is null)
                return CommandResult.BadRequest;

            user.IsActive = false;

            await _dbContext.Users.SoftDeleteAndSaveAsync(user);

            return CommandResult.OK;
        }
    }
}
