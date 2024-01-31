namespace Equiprent.Entities.Business.Equipment
{
    public partial class Equipment : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
