namespace Equiprent.Entities.Application
{
    public partial class UserPermission : IDeleteable
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
