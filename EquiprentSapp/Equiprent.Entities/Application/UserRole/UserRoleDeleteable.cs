namespace Equiprent.Entities.Application
{
    public partial class UserRole : IDeleteable
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
