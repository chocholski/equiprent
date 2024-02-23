using Equiprent.Entities.Business.Manufacturers;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.GeneralModels;
using Equiprent.Logic.Queries.Manufacturers.Handlers.PagedManufacturersList;
using System.Linq.Expressions;
using System.Threading;

namespace Equiprent.Logic.Queries.Manufacturers.Responses.PagedManufacturersList
{
    public class PagedManufacturersListResponse : ListViewModelBaseResponse<Manufacturer, ManufacturerDto, ManufacturerListItemViewModel>
    {
        private static new readonly Expression<Func<Manufacturer, ManufacturerDto>> _selector = entity => new ManufacturerDto
        {
            AddressSummary = new ManufacturerAddressModel
            {
                ApartmentNumber = entity.Address.ApartmentNumber,
                City = entity.Address.City,
                Country = new CountryModel
                {
                    Id = entity.Address.CountryId,
                    Code = entity.Address.Country.Code,
                },
                Email = entity.Address.Email,
                Id = entity.Address.Id,
                PhoneNumber = entity.Address.PhoneNumber,
                PostalCode = entity.Address.PostalCode,
                StreetName = entity.Address.StreetName,
                StreetNumber = entity.Address.StreetNumber,
            }.GetSummary(),
            Id = entity.Id,
            IsDeleted = entity.IsDeleted,
            IsOperational = entity.IsOperational,
            Name = entity.Name,
            NationalId = entity.Address.NationalCompanyId,
        };

        public PagedManufacturersListResponse(
            RequestParameters requestParameters,
            IQueryable<Manufacturer> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider, _selector)
        {
        }

        protected override async Task<ManufacturerListItemViewModel> MapEntityToViewModelAsync(ManufacturerDto entity, CancellationToken cancellationToken = default) =>
            await Task.FromResult(entity.Adapt<ManufacturerListItemViewModel>());
    }
}
