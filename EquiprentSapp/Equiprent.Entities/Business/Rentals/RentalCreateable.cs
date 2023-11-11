namespace Equiprent.Entities.Business.Rentals
{
    public partial class Rental : ICreateable
    {
        public Guid? CreatedById { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
