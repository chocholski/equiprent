using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Equipments.Requests.Delete;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Equipments.Handlers.Delete
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
            var equipment = await _dbContext.Equipments
                .SingleOrDefaultAsync(e => !e.IsDeleted && e.Id == request.Id, cancellationToken);

            if (equipment is null)
                return CommandResult.BadRequest;

            await _dbContext.Equipments.SoftDeleteAndSaveAsync(equipment, cancellationToken);

            return CommandResult.OK;
        }
    }
}
