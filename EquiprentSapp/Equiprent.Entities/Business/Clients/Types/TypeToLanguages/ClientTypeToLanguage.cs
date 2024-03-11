using Equiprent.Entities.Business.ClientTypes;

namespace Equiprent.Entities.Business.ClientTypeToLanguages
{
    public partial class ClientTypeToLanguage
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public required string Name { get; set; }

        [ForeignKey(nameof(ClientType))]
        [TranslatedEntity(nameof(ClientType))]
        public int ClientTypeId { get; set; }
        public virtual ClientType ClientType { get; set; } = null!;
    }
}
