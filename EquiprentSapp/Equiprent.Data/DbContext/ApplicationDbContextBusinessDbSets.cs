using Equiprent.Entities.Application;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext
    {
        public DbSet<UserPermissionToUserPermission> UserPermissionToUserPermissions { get; set; } = null!;
    }
}
