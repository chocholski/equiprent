using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.Delete;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id, cancellationToken);

            if (user is null)
                return CommandResult.BadRequest;

            user.IsActive = false;
            await _dbContext.Users.SoftDeleteAndSaveAsync(user, cancellationToken);

            return CommandResult.OK;
        }
    }
}
