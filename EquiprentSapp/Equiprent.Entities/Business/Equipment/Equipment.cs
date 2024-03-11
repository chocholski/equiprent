using Equiprent.Entities.Business.EquipmentTypes;
using Equiprent.Entities.Business.Manufacturers;

namespace Equiprent.Entities.Business.Equipment
{
    public partial class Equipment
    {
        public string? Description { get; set; }

        [Key]
        public Guid Id { get; set; }

        [ForeignKey(nameof(Manufacturer))]
        public Guid ManufacturerId { get; set; }
        public virtual Manufacturer Manufacturer { get; set; } = null!;

        public decimal MarketValue { get; set; }

        public required string Name { get; set; }

        public decimal PricePerDay { get; set; }

        public required string SerialNumber { get; set; }

        [ForeignKey(nameof(Type))]
        public int TypeId { get; set; }
        public virtual EquipmentType Type { get; set; } = null!;
    }
}
