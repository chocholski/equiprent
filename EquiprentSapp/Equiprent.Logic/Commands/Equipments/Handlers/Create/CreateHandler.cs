using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Equipments;
using Equiprent.Logic.Commands.Equipments.Requests.Create;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Equipments.Handlers.Create
{
    public class CreateHandler : IRequestHandler<CreateRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;

        public CreateHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult> Handle(CreateRequest request, CancellationToken cancellationToken)
        { 
            var equipment = new Equipment
            {
                CreatedById = request.CreatedById,
                CreatedOn = DateTime.Now,
                Description = request.Description,
                IsDeleted = false,
                ManufacturerId = request.ManufacturerId,
                MarketValue = request.MarketValue,
                Name = request.Name,
                PricePerDay = request.PricePerDay,
                SerialNumber = request.SerialNumber,
                TypeId = request.TypeId,
            };

            await _dbContext.Equipments.AddAndSaveAsync(equipment, cancellationToken);

            return CommandResult.OK;
        }
    }
}
