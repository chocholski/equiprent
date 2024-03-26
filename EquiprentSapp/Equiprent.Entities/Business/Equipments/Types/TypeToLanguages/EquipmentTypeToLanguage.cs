namespace Equiprent.Entities.Business.Equipments.Types.TypeToLanguages
{
    public partial class EquipmentTypeToLanguage
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public required string Name { get; set; }

        [ForeignKey(nameof(EquipmentType))]
        [TranslatedEntity(nameof(EquipmentType))]
        public int EquipmentTypeId { get; set; }
        public virtual EquipmentType EquipmentType { get; set; } = null!;
    }
}
