using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Requests.Delete;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.Delete
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, CommandResult?>
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteHandler(ApplicationDbContext dbContext) { _dbContext = dbContext; }

        public async Task<CommandResult?> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var client = await _dbContext.Clients
                .SingleOrDefaultAsync(c => !c.IsDeleted && c.Id == request.Id, cancellationToken);

            if (client is null)
                return CommandResult.BadRequest;

            await SoftDeleteClientRepresentativesAsync(client, cancellationToken);
            await _dbContext.Clients.SoftDeleteAndSaveAsync(client, cancellationToken);

            return CommandResult.OK;
        }

        private async Task SoftDeleteClientRepresentativesAsync(Client client, CancellationToken cancellationToken = default)
        {
            if (client.ClientTypeId != (int)ClientTypeEnum.Company)
                return;

            var clientRepresentatives = await _dbContext.ClientRepresentatives
                .Where(representative =>
                    !representative.IsDeleted &&
                    representative.ClientId == client.Id)
                .ToListAsync(cancellationToken);

            foreach (var representative in clientRepresentatives)
                _dbContext.ClientRepresentatives.SoftDelete(representative);
        }
    }
}
