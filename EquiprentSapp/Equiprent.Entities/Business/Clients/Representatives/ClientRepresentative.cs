using Equiprent.Entities.Business.Representatives;

namespace Equiprent.Entities.Business.Clients.Representatives
{
    [Table("ClientRepresentatives")]
    public class ClientRepresentative : Representative
    {
        [ForeignKey(nameof(Client))]
        public Guid ClientId { get; set; }
        public virtual Client Client { get; set; } = null!;
    }
}
