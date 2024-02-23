using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Clients.Requests.Delete;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.Delete
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public DeleteHandler(
            ApplicationDbContext dbContext,
            IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<CommandResult> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var client = await _dbContext.Clients
                .SingleOrDefaultAsync(c => !c.IsDeleted && c.Id == request.Id, cancellationToken);

            if (client is null)
                return CommandResult.BadRequest;

            var clientRepresentativesDeletedResult = await _mediator.Send(
                new Requests.DeleteClientRepresentativesForClient.DeleteRepresentativesForClientRequest(client.Id),
                cancellationToken);

            if (!clientRepresentativesDeletedResult.IsOk())
                return CommandResult.BadRequest;

            await _dbContext.Clients.SoftDeleteAndSaveAsync(client, cancellationToken);

            return CommandResult.OK;
        }
    }
}
