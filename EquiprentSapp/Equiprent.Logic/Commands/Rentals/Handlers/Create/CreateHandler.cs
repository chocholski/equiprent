using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Equipments.Handlers.Create.Creators;
using Equiprent.Logic.Commands.Rentals.Requests.Create;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Rentals.Handlers.Create
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
            var rentalCreator = new RentalCreatorFactory(request).GetRentalCreator();
            if (rentalCreator is null)
                return CommandResult.BadRequest;

            var rental = rentalCreator.CreateRental();
            if (rental is null)
                return CommandResult.BadRequest;

            await _dbContext.Rentals.AddAndSaveAsync(rental, cancellationToken);

            return CommandResult.OK;
        }
    }
}
