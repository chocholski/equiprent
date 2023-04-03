namespace Equiprent.Entities.Application
{
    public class UserPermissionToUserPermission
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("UserPermission")]
        public int UserPermissionId { get; set; }
        public virtual UserPermission UserPermission { get; set; } = null!;

        [ForeignKey("LinkedUserPermission")]
        public int LinkedUserPermissionId { get; set; }
        public virtual UserPermission LinkedUserPermission { get; set; } = null!;
    }
}
