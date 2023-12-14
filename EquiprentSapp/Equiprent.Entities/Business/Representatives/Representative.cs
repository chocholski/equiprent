using Equiprent.Entities.Application.Addresses;

namespace Equiprent.Entities.Business.Representatives
{
    [Table("Representatives")]
    public abstract partial class Representative
    {
        [ForeignKey(nameof(Address))]
        public int? AddressId { get; set; }
        public virtual Address? Address { get; set; }

        public string FirstName { get; set; } = null!;

        [Key]
        public Guid Id { get; set; }

        public string LastName { get; set; } = null!;
    }
}
