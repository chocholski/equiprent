namespace Equiprent.Entities.Application
{
    public partial class UserPermission : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}
