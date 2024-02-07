namespace Equiprent.Entities.Business.Manufacturers
{
    public partial class Manufacturer : ICreateable
    {
        public Guid? CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
