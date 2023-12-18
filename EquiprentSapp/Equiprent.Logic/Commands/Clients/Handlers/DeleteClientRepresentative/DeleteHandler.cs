using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Clients.Requests.DeleteClientRepresentative;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Handlers.DeleteClientRepresentative
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
            var clientRepresentative = await _dbContext.ClientRepresentatives
                .SingleOrDefaultAsync(representative =>
                    !representative.IsDeleted &&
                    representative.Id == request.Id);

            if (clientRepresentative is null)
                return CommandResult.BadRequest;

            await _dbContext.ClientRepresentatives.SoftDeleteAndSaveAsync(clientRepresentative);

            return CommandResult.OK;
        }
    }
}
