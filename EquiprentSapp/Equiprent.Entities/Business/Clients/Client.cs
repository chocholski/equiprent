using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Entities.Business.ClientTypes;

namespace Equiprent.Entities.Business.Clients
{
    [Table("Clients")]
    public abstract partial class Client
    {
        [InverseProperty(nameof(ClientRepresentative.Client))]
        public virtual List<ClientRepresentative> ClientRepresentatives { get; set; } = new();

        [ForeignKey(nameof(ClientType))]
        public int ClientTypeId { get; set; }
        public virtual ClientType ClientType { get; set; } = null!;

        [Key]
        public Guid Id { get; set; }

        public string? Name { get; set; }
    }
}
