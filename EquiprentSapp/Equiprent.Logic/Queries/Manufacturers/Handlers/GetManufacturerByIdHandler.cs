using Equiprent.Data.DbContext;
using Equiprent.Logic.GeneralModels;
using Equiprent.Logic.Queries.Manufacturers.Requests;
using Equiprent.Logic.Queries.Manufacturers.Responses.ManufacturerById;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Manufacturers.Handlers
{
    public class GetManufacturerByIdHandler : IRequestHandler<GetManufacturerByIdRequest, ManufacturerByIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetManufacturerByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ManufacturerByIdResponse?> Handle(GetManufacturerByIdRequest request, CancellationToken cancellationToken = default)
        {
            var manufacturer = await _dbContext.Manufacturers
                .Include(m => m.Address)
                .SingleOrDefaultAsync(m => m.Id == request.Id, cancellationToken);

            if (manufacturer is null)
                return null;

            var result = manufacturer.Adapt<ManufacturerByIdResponse>();
            var manufacturerAddress = manufacturer.Address;
            result.Address = new ManufacturerAddressModel
            {
                ApartmentNumber = manufacturerAddress.ApartmentNumber,
                City = manufacturerAddress.City,
                Country = new CountryModel
                {
                    Id = manufacturerAddress.CountryId,
                },
                Email = manufacturerAddress.Email,
                NationalId = manufacturerAddress.NationalCompanyId,
                PhoneNumber = manufacturerAddress.PhoneNumber,
                PostalCode = manufacturerAddress.PostalCode,
                StreetName = manufacturerAddress.StreetName,
                StreetNumber = manufacturerAddress.StreetNumber,
            };

            return result;
        }
    }
}
