using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters;
using Equiprent.Logic.Commands.Clients.Requests.Save;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save
{
    public class SaveHandler : IRequestHandler<SaveRequest, CommandResult?>
    {
        private readonly ApplicationDbContext _dbContext;

        public SaveHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult?> Handle(SaveRequest request, CancellationToken cancellationToken)
        {
            var client = await _dbContext.Clients
                .SingleOrDefaultAsync(c => !c.IsDeleted && c.Id == request.Id, cancellationToken);

            if (client is null)
                return CommandResult.BadRequest;

            var clientUpdateStrategy = new ClientUpdateStrategyFactory(_dbContext)
                .GetClientUpdateStrategy(client, request);

            var updatedClient = await clientUpdateStrategy.UpdateClientWithRequestAsync(client, request, cancellationToken);

            if (updatedClient is null)
                return CommandResult.BadRequest;

            if (!await clientUpdateStrategy.UpdateClientAddressesWithRequestAsync(client, updatedClient, request, cancellationToken))
                return CommandResult.BadRequest;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return CommandResult.OK;
        }
    }
}
