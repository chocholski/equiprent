namespace Equiprent.Data.CustomQueryTypes.Equipments
{
    public class EquipmentListQueryModel
    {
        public required Guid Id { get; set; }

        public required Guid ManufacturerId { get; set; }

        public required string ManufacturerName { get; set; }

        public required string Name { get; set; }

        public required decimal PricePerDay { get; set; }

        public required string SerialNumber { get; set; }

        public required int TypeId { get; set; }

        public required string TypeName { get; set; }
    }
}
