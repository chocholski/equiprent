using Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsList;
using MediatR;

namespace Equiprent.Logic.Queries.Equipments.Requests
{
    public record GetPagedEquipmentsListRequest : IRequest<PagedEquipmentsListResponse?>
    {
        public RequestParameters RequestParameters { get; set; }

        public GetPagedEquipmentsListRequest(RequestParameters requestParameters)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(EquipmentListItemViewModel));
        }
    }
}
