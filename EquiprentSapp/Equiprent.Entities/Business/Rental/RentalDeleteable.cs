namespace Equiprent.Entities.Business.Rental
{
    public partial class Rental : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}
