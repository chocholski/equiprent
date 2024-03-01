namespace Equiprent.Entities.Business.Equipment.Photos
{
    public partial class EquipmentPhoto : FileBase
    {
        [Key]
        public Guid Id { get; set; }

        public bool IsMainThumbnail { get; set; }

        [ForeignKey(nameof(Equipment))]
        public Guid EquipmentId { get; set; }
        public virtual Equipment Equipment { get; set; } = null!;
    }
}
