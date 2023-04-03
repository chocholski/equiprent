
using System.Linq;

namespace Equiprent.Entities.Application
{
    public class UserRole : ICreateable, IDeleteable
    {
        [Key]
        public int Id { get; set; }

        #region ICreateable
        public DateTime CreatedOn { get; set; }

        [ForeignKey("CreatedByUser")]
        public int? CreatedById { get; set; }
        public virtual User? CreatedByUser { get; set; }
        #endregion

        #region IDeleteable
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
        #endregion        

        [InverseProperty(nameof(UserPermissionToRole.UserRole))]
        public virtual List<UserPermissionToRole> UserPermissionToRoles { get; set; } = null!;

        public List<int> GetPermissionsIds()
        {
            return UserPermissionToRoles.Select(x => x.UserPermissionId).ToList();
        }
    }
}
