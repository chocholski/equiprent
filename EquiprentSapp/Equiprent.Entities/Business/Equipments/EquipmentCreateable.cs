namespace Equiprent.Entities.Business.Equipments
{
    public partial class Equipment : ICreateable
    {
        public Guid? CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
