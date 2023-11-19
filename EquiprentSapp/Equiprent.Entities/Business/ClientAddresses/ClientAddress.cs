using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.Addresses;

namespace Equiprent.Entities.Business.ClientAddresses
{
    public partial class ClientAddress
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Address))]
        public int AddressId { get; set; }
        public virtual Address Address { get; set; } = null!;

        [ForeignKey(nameof(Client))]
        public Guid ClientId { get; set; }
        public virtual Client Client { get; set; } = null!;
    }
}
