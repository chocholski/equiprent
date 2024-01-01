using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Clients.Requests.DeleteClientRepresentative;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.DeleteClientRepresentative
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, CommandResult?>
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult?> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var clientRepresentative = await _dbContext.ClientRepresentatives
                .SingleOrDefaultAsync(representative =>
                    !representative.IsDeleted &&
                    representative.Id == request.Id,
                    cancellationToken);

            if (clientRepresentative is null)
                return CommandResult.BadRequest;

            await _dbContext.ClientRepresentatives.SoftDeleteAndSaveAsync(clientRepresentative, cancellationToken);

            return CommandResult.OK;
        }
    }
}
