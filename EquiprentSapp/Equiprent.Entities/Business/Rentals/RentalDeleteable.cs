namespace Equiprent.Entities.Business.Rentals
{
    public partial class Rental : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}
