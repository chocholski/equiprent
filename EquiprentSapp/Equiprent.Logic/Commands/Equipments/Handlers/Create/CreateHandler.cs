using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Users;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Equipment;
using Equiprent.Logic.Commands.Equipments.Requests.Create;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Equipments.Handlers.Create
{
    public class CreateHandler : IRequestHandler<CreateRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userService;

        public CreateHandler(ApplicationDbContext dbContext, IUserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        public async Task<CommandResult> Handle(CreateRequest request, CancellationToken cancellationToken)
        {
            var createdById = _userService.GetUserId();
            if (!createdById.HasValue)
                return CommandResult.BadRequest;

            var equipment = new Equipment
            {
                CreatedById = createdById.Value,
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
