using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Requests.DeleteClientRepresentativesForClient;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.DeleteClientRepresentativesForClient
{
    public class DeleteRepresentativesForClientHandler : IRequestHandler<DeleteRepresentativesForClientRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteRepresentativesForClientHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult> Handle(DeleteRepresentativesForClientRequest request, CancellationToken cancellationToken)
        {
            var clientTypeId = await _dbContext.Clients
                .Where(c => c.Id == request.ClientId)
                .Select(c => c.ClientTypeId)
                .SingleOrDefaultAsync();

            if (clientTypeId != (int)ClientTypeEnum.Company)
                return CommandResult.OK;

            var clientRepresentatives = await _dbContext.ClientRepresentatives
                .Where(representative =>
                    !representative.IsDeleted &&
                    representative.ClientId == request.ClientId)
                .ToListAsync(cancellationToken);

            foreach (var representative in clientRepresentatives)
                _dbContext.ClientRepresentatives.SoftDelete(representative);

            return CommandResult.OK;
        }
    }
}
