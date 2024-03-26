namespace Equiprent.Entities.Business.Rentals
{
    public partial class Rental : ICreateable
    {
        public Guid? CreatedById { get; set; }

        public required DateTime CreatedOn { get; set; }
    }
}
