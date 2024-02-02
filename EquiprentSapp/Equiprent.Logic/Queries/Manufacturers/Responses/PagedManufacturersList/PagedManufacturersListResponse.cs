using Equiprent.Entities.Business.Manufacturers;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.GeneralModels;
using System.Threading;

namespace Equiprent.Logic.Queries.Manufacturers.Responses.PagedManufacturersList
{
    public class PagedManufacturersListResponse : ListViewModelBaseResponse<Manufacturer, ManufacturerListItemViewModel>
    {
        public PagedManufacturersListResponse(
            RequestParameters requestParameters,
            IQueryable<Manufacturer> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider)
        {
        }

        protected override async Task<ManufacturerListItemViewModel> MapEntityToViewModelAsync(Manufacturer manufacturer, CancellationToken cancellationToken = default) =>
            await Task.FromResult(new ManufacturerListItemViewModel
            {
                AddressSummary = new ManufacturerAddressModel
                {
                    ApartmentNumber = manufacturer.Address.ApartmentNumber,
                    City = manufacturer.Address.City,
                    Country = new CountryModel
                    {
                        Id = manufacturer.Address.CountryId,
                        Code = manufacturer.Address.Country.Code,
                    },
                    Email = manufacturer.Address.Email,
                    Id = manufacturer.Address.Id,
                    PhoneNumber = manufacturer.Address.PhoneNumber,
                    PostalCode = manufacturer.Address.PostalCode,
                    StreetName = manufacturer.Address.StreetName,
                    StreetNumber = manufacturer.Address.StreetNumber,
                }
                .GetSummary(),
                Id = manufacturer.Id,
                IsOperational = manufacturer.IsOperational,
                Name = manufacturer.Name,
                NationalId = manufacturer.Address.NationalCompanyId,
            });
    }
}
