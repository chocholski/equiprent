using Equiprent.Data.CustomQueryTypes.Equipments;
using Equiprent.Logic.Abstractions;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsSelectionList
{
    public class PagedEquipmentsSelectionListResponse : ListViewModelBaseResponse<EquipmentSelectionListQueryModel, EquipmentSelectionListQueryModel, EquipmentSelectionListItemViewModel>
    {
        public PagedEquipmentsSelectionListResponse(
            RequestParameters requestParameters,
            IQueryable<EquipmentSelectionListQueryModel> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider)
        {
        }

        protected override async Task<EquipmentSelectionListItemViewModel> MapEntityToViewModelAsync(EquipmentSelectionListQueryModel entity, CancellationToken cancellationToken = default)
        {
            return await Task.FromResult(new EquipmentSelectionListItemViewModel
            {
                Id = entity.Id,
                ManufacturerId = entity.ManufacturerId,
                ManufacturerName = entity.ManufacturerName,
                Name = entity.Name,
                SerialNumber = entity.SerialNumber,
                TypeId = entity.TypeId,
                TypeName = entity.TypeName,
            });
        }
    }
}
