using Equiprent.Entities.Business.Manufacturers.Addresses;

namespace Equiprent.Entities.Business.Manufacturers
{
    public partial class Manufacturer
    {
        [ForeignKey(nameof(Address))]
        public int AddressId { get; set; }
        public virtual ManufacturerAddress Address { get; set; } = null!;

        [Key]
        public Guid Id { get; set; }

        public bool IsOperational { get; set; }

        public required string Name { get; set; }
    }
}
