using Equiprent.Entities.Application.Addresses;

namespace Equiprent.Entities.Business.Representatives
{
    [Table("Representatives")]
    public abstract partial class Representative
    {
        [ForeignKey(nameof(Address))]
        public int? AddressId { get; set; }
        public virtual Address? Address { get; set; }

        public required string FirstName { get; set; }

        [Key]
        public Guid Id { get; set; }

        public required string LastName { get; set; }
    }
}
