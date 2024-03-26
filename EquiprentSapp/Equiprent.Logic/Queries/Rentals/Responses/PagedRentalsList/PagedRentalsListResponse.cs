using Equiprent.Data.CustomQueryTypes.Rentals;
using Equiprent.Logic.Abstractions;
using System.Threading;

namespace Equiprent.Logic.Queries.Rentals.Responses.PagedRentalsList
{
    public class PagedRentalsListResponse : ListViewModelBaseResponse<RentalListQueryModel, RentalListQueryModel, RentalListItemViewModel>
    {
        public PagedRentalsListResponse(
            RequestParameters requestParameters,
            IQueryable<RentalListQueryModel> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider)
        {
        }

        protected override async Task<RentalListItemViewModel> MapEntityToViewModelAsync(RentalListQueryModel entity, CancellationToken cancellationToken = default)
        {
            return await Task.FromResult(new RentalListItemViewModel
            {
                CategoryId = entity.CategoryId,
                End = entity.End,
                Id = entity.Id,
                Number = entity.Number,
                RenterId = entity.RenterId,
                RenterName = entity.RenterName,
                RentierId = entity.RentierId,
                RentierName = entity.RentierName,
                Start = entity.Start,
                UserResponsibleForHandlingId = entity.UserResponsibleForHandlingId,
                UserResponsibleForHandlingName = $"{entity.UserResponsibleForHandlingLastName} {entity.UserResponsibleForHandlingFirstName}",
            });
        }
    }
}
