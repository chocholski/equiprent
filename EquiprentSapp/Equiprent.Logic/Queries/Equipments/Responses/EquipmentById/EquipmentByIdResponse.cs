namespace Equiprent.Logic.Queries.Equipments.Responses.EquipmentById
{
    public class EquipmentByIdResponse
    {
        public string? Description { get; set; }

        public required Guid Id { get; set; }

        public required Guid ManufacturerId { get; set; }

        public required decimal MarketValue { get; set; }

        public required string Name { get; set; }

        public List<EquipmentPhotoResponse> Photos { get; set; } = new();

        public required decimal PricePerDay { get; set; }

        public required string SerialNumber { get; set; }

        public required int TypeId { get; set; }
    }
}
