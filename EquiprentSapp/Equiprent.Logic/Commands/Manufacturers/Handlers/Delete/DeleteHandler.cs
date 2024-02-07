using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Manufacturers.Requests.Delete;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Manufacturers.Handlers.Delete
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteHandler(ApplicationDbContext dbContext) { _dbContext = dbContext; }

        public async Task<CommandResult> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var manufacturer = await _dbContext.Manufacturers
                .SingleOrDefaultAsync(m => !m.IsDeleted && m.Id == request.Id, cancellationToken);

            if (manufacturer is null)
                return CommandResult.BadRequest;

            manufacturer.IsOperational = false;
            await _dbContext.Manufacturers.SoftDeleteAndSaveAsync(manufacturer, cancellationToken);

            return CommandResult.OK;
        }
    }
}
