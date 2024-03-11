using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsList
{
    public class EquipmentListItemViewModel
    {
        public required Guid Id { get; set; }

        public required Guid ManufacturerId { get; set; }

        public required string ManufacturerName { get; set; }

        [SortColumn]
        public required string Name { get; set; }

        public required decimal PricePerDay { get; set; }

        public required string SerialNumber { get; set; }

        public required int TypeId { get; set; }

        public required string TypeName { get; set; }
    }
}
