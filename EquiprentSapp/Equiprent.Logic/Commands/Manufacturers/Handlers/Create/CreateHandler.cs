using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.ManufacturerAddresses;
using Equiprent.Entities.Business.Manufacturers;
using Equiprent.Logic.Commands.Manufacturers.Requests.Create;
using Equiprent.Logic.GeneralModels;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Manufacturers.Handlers.Create
{
    public class CreateHandler : IRequestHandler<CreateRequest, CommandResult?>
    {
        private readonly ApplicationDbContext _dbContext;

        public CreateHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult?> Handle(CreateRequest request, CancellationToken cancellationToken = default)
        {
            var manufacturerAddress = CreateManufacturerAddressWithRequest(request);
            _dbContext.ManufacturerAddresses.Add(manufacturerAddress);

            var manufacturer = new Manufacturer
            {
                Address = manufacturerAddress,
                CreatedById = request.CreatedById,
                CreatedOn = DateTime.Now,
                IsDeleted = false,
                IsOperational = request.IsOperational,
                Name = request.Name
            };

            await _dbContext.Manufacturers.AddAndSaveAsync(manufacturer, cancellationToken);

            return CommandResult.OK;
        }

        private static ManufacturerAddress CreateManufacturerAddressWithRequest(CreateRequest request)
        {
            var address = AddressModel.CreateAddressFromModel(request.Address);
            return new ManufacturerAddress(address, request.Address.NationalId);
        }
    }
}
