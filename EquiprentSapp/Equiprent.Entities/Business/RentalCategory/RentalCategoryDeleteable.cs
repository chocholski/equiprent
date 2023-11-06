namespace Equiprent.Entities.Business.RentalCategories
{
    public partial class RentalCategory : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}
