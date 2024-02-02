using Equiprent.Logic.Queries.Manufacturers.Responses.PagedManufacturersList;
using MediatR;

namespace Equiprent.Logic.Queries.Manufacturers.Requests
{
    public record GetPagedManufacturersListRequest : IRequest<PagedManufacturersListResponse?>
    {
        public RequestParameters RequestParameters { get; set; }

        public GetPagedManufacturersListRequest(RequestParameters requestParameters)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(ManufacturerListItemViewModel));
        }
    }
}
