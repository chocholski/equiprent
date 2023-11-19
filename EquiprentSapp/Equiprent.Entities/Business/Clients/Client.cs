using Equiprent.Entities.Business.ClientTypes;

namespace Equiprent.Entities.Business.Clients
{
    public partial class Client
    {
        [ForeignKey(nameof(ClientType))]
        public int ClientTypeId { get; set; }
        public virtual ClientType ClientType { get; set; } = null!;

        [Key]
        public Guid Id { get; set; }

        public string? Name { get; set; }
    }
}
