using Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsSelectionList;
using MediatR;

namespace Equiprent.Logic.Queries.Equipments.Requests
{
    public class GetPagedEquipmentsSelectionListRequest : IRequest<PagedEquipmentsSelectionListResponse?>
    {
        public RequestParameters RequestParameters { get; init; }

        public GetPagedEquipmentsSelectionListRequest(RequestParameters requestParameters)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(EquipmentSelectionListItemViewModel));
        }
    }
}
