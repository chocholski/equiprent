using Equiprent.Data.CustomQueryTypes.Equipments;
using Equiprent.Logic.Abstractions;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsList
{
    public class PagedEquipmentsListResponse : ListViewModelBaseResponse<EquipmentListQueryModel, EquipmentListItemViewModel>
    {
        public PagedEquipmentsListResponse(
            RequestParameters requestParameters,
            IQueryable<EquipmentListQueryModel> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider)
        {
        }

        protected override async Task<EquipmentListItemViewModel> MapEntityToViewModelAsync(EquipmentListQueryModel entity, CancellationToken cancellationToken = default) =>
            await Task.FromResult(new EquipmentListItemViewModel
            {
                Id = entity.Id,
                ManufacturerId = entity.ManufacturerId,
                ManufacturerName = entity.ManufacturerName,
                Name = entity.Name,
                PricePerDay = entity.PricePerDay,
                SerialNumber = entity.SerialNumber,
                TypeId = entity.TypeId,
                TypeName = entity.TypeName,
            });
    }
}
