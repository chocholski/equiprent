using Equiprent.Logic.Queries.Rentals.Responses.PagedRentalsList;
using MediatR;

namespace Equiprent.Logic.Queries.Rentals.Requests
{
    public record GetPagedRentalsListRequest : IRequest<PagedRentalsListResponse?>
    {
        public RequestParameters RequestParameters { get; set; }

        public GetPagedRentalsListRequest(RequestParameters requestParameters)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(RentalListItemViewModel));
        }
    }
}
