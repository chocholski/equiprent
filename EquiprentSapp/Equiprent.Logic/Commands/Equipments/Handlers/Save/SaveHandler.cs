using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Equipments.Requests.Save;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Equipments.Handlers.Save
{
    public class SaveHandler : IRequestHandler<SaveRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;

        public SaveHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult> Handle(SaveRequest request, CancellationToken cancellationToken)
        {
            var equipment = await _dbContext.Equipments
                .SingleOrDefaultAsync(e => !e.IsDeleted && e.Id == request.Id, cancellationToken);

            if (equipment is null)
                return CommandResult.BadRequest;

            equipment.Description = request.Description;
            equipment.ManufacturerId = request.ManufacturerId;
            equipment.MarketValue = request.MarketValue;
            equipment.Name = request.Name;
            equipment.PricePerDay = request.PricePerDay;
            equipment.SerialNumber = request.SerialNumber;
            equipment.TypeId = request.TypeId;

            await _dbContext.Equipments.UpdateAndSaveAsync(equipment, cancellationToken);

            return CommandResult.OK;
        }
    }
}
