using Equiprent.ApplicationImplementations.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Requests.Delete;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Handlers.Delete
{
    public class DeleteHandler : ICommandHandler<DeleteRequest>
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteHandler(ApplicationDbContext dbContext) { _dbContext = dbContext; }

        public async Task<CommandResult> HandleAsync(DeleteRequest request)
        {
            var client = await _dbContext.Clients
                .SingleOrDefaultAsync(c => !c.IsDeleted && c.Id == request.Id);

            if (client is null)
                return CommandResult.BadRequest;

            await SoftDeleteClientRepresentativesAsync(client);
            await _dbContext.Clients.SoftDeleteAndSaveAsync(client);

            return CommandResult.OK;
        }

        private async Task SoftDeleteClientRepresentativesAsync(Client client)
        {
            if (client.ClientTypeId != (int)ClientTypeEnum.Company)
                return;

            var clientRepresentatives = await _dbContext.ClientRepresentatives
                .Where(representative =>
                    !representative.IsDeleted &&
                    representative.ClientId == client.Id)
                .ToListAsync();

            foreach (var representative in clientRepresentatives)
                _dbContext.ClientRepresentatives.SoftDelete(representative);
        }
    }
}
