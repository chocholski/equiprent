using Equiprent.Entities.Application.UserPermissions;

namespace Equiprent.Entities.Application.UserPermissionToUserPermissions
{
    public class UserPermissionToUserPermission
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(LinkedUserPermission))]
        public int LinkedUserPermissionId { get; set; }
        public virtual UserPermission LinkedUserPermission { get; set; } = null!;

        [ForeignKey(nameof(UserPermission))]
        public int UserPermissionId { get; set; }
        public virtual UserPermission UserPermission { get; set; } = null!;
    }
}
