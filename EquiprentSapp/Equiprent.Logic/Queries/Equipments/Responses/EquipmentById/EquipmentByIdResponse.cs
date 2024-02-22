namespace Equiprent.Logic.Queries.Equipments.Responses.EquipmentById
{
    public class EquipmentByIdResponse
    {
        public string? Description { get; set; }

        public Guid Id { get; set; }

        public Guid ManufacturerId { get; set; }

        public decimal MarketValue { get; set; }

        public string Name { get; set; } = null!;

        public decimal PricePerDay { get; set; }

        public string SerialNumber { get; set; } = null!;

        public int TypeId { get; set; }
    }
}
