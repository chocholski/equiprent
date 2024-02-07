namespace Equiprent.Entities.Business.Manufacturers
{
    public partial class Manufacturer : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
