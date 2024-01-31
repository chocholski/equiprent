using Equiprent.Entities.Business.EquipmentTypes;

namespace Equiprent.Entities.Business.EquipmentTypeToLanguages
{
    public partial class EquipmentTypeToLanguage
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; } = null!;

        [ForeignKey(nameof(EquipmentType))]
        [TranslatedEntity(nameof(EquipmentType))]
        public int EquipmentTypeId { get; set; }
        public virtual EquipmentType EquipmentType { get; set; } = null!;
    }
}
