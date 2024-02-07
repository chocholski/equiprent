using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.ManufacturerAddresses;
using Equiprent.Logic.Commands.Manufacturers.Requests.Save;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Manufacturers.Handlers.Save
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
            var manufacturer = await _dbContext.Manufacturers
                .Include(m => m.Address)
                .SingleOrDefaultAsync(m => !m.IsDeleted && m.Id == request.Id, cancellationToken);

            if (manufacturer is null)
                return CommandResult.BadRequest;

            manufacturer.IsOperational = request.IsOperational;
            manufacturer.Name = request.Name;

            if (UpdateManufacturerAddressWithRequest(manufacturer.Address, request) != CommandResult.OK)
                return CommandResult.BadRequest;

            await _dbContext.Manufacturers.UpdateAndSaveAsync(manufacturer, cancellationToken);

            return CommandResult.OK;
        }

        private CommandResult UpdateManufacturerAddressWithRequest(ManufacturerAddress manufacturerAddress, SaveRequest request)
        {
            manufacturerAddress.ApartmentNumber = request.Address.ApartmentNumber;
            manufacturerAddress.City = request.Address.City;
            manufacturerAddress.CountryId = request.Address.Country.Id;
            manufacturerAddress.Email = request.Address.Email;
            manufacturerAddress.NationalCompanyId = request.Address.NationalId;
            manufacturerAddress.PhoneNumber = request.Address.PhoneNumber;
            manufacturerAddress.PostalCode = request.Address.PostalCode;
            manufacturerAddress.StreetName = request.Address.StreetName;
            manufacturerAddress.StreetNumber = request.Address.StreetNumber;

            _dbContext.ManufacturerAddresses.Update(manufacturerAddress);

            return CommandResult.OK;
        }
    }
}
