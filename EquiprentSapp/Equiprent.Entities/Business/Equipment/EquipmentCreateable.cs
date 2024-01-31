namespace Equiprent.Entities.Business.Equipment
{
    public partial class Equipment : ICreateable
    {
        public Guid? CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
