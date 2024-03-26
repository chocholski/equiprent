namespace Equiprent.Entities.Business.Equipments.Types
{
    public partial class EquipmentType : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
