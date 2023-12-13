using Equiprent.Entities.Application.Addresses;

namespace Equiprent.Entities.Business.ClientAddresses
{
    [Table("ClientAddresses")]
    public abstract partial class ClientAddress
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Address))]
        public int AddressId { get; set; }
        public virtual Address Address { get; set; } = null!;
    }
}
