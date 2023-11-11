
using Equiprent.Entities.Application.UserPermissionToRoles;
using System.Linq;

namespace Equiprent.Entities.Application.UserRoles
{
    public partial class UserRole
    {
        [Key]
        public int Id { get; set; }        

        [InverseProperty(nameof(UserPermissionToRole.UserRole))]
        public virtual List<UserPermissionToRole> UserPermissionToRoles { get; set; } = null!;

        public List<int> GetPermissionsIds()
        {
            return UserPermissionToRoles.Select(permissionToRole => permissionToRole.UserPermissionId).ToList();
        }
    }
}
