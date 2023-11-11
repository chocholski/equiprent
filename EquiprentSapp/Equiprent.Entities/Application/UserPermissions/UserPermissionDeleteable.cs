namespace Equiprent.Entities.Application.UserPermissions
{
    public partial class UserPermission : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}
