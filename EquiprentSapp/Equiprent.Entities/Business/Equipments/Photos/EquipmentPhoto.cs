namespace Equiprent.Entities.Business.Equipments.Photos
{
    public partial class EquipmentPhoto : FileBase
    {
        [Key]
        public Guid Id { get; set; }

        public bool IsMainThumbnail { get; set; }

        [ForeignKey(nameof(Equipment))]
        public required Guid EquipmentId { get; set; }
        public virtual Equipment Equipment { get; set; } = null!;
    }
}
