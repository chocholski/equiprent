using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsList
{
    public class EquipmentListItemViewModel
    {
        public Guid Id { get; set; }

        public Guid ManufacturerId { get; set; }

        public string ManufacturerName { get; set; } = null!;

        [SortColumn]
        public string Name { get; set; } = null!;

        public decimal PricePerDay { get; set; }

        public string SerialNumber { get; set; } = null!;

        public int TypeId { get; set; }

        public string TypeName { get; set; } = null!;
    }
}
