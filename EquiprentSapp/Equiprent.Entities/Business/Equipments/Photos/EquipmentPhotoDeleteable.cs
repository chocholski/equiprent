namespace Equiprent.Entities.Business.Equipments.Photos
{
    public partial class EquipmentPhoto : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
