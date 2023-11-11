namespace Equiprent.Entities.Application.UserRoles
{
    public partial class UserRole : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}
