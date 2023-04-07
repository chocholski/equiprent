namespace Equiprent.Entities.Application
{
    public partial class User : IDeleteable
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
