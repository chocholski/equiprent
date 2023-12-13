using Equiprent.Entities.Business.Clients;

namespace Equiprent.Entities.Business.ClientAddresses
{
    [Table("PrivateClientAddresses")]
    public class PrivateClientAddress : ClientAddress
    {
        public string? NationalCitizenId { get; set; }

        [ForeignKey(nameof(PrivateClient))]
        public Guid PrivateClientId { get; set; }
        public virtual Client PrivateClient { get; set; } = null!;
    }
}
