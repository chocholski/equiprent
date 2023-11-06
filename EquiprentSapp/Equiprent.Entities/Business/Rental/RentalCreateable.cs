namespace Equiprent.Entities.Business.Rental
{
    public partial class Rental : ICreateable
    {
        public Guid? CreatedById { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
