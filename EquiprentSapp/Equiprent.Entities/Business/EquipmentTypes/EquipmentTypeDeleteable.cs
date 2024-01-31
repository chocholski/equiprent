namespace Equiprent.Entities.Business.EquipmentTypes
{
    public partial class EquipmentType : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
