using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.Representatives;

namespace Equiprent.Entities.Business.ClientRepresentatives
{
    [Table("ClientRepresentatives")]
    public class ClientRepresentative : Representative
    {
        [ForeignKey(nameof(Client))]
        public Guid ClientId { get; set; }
        public virtual Client Client { get; set; } = null!;
    }
}
