using Equiprent.Entities.Application;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext
    {
        public DbSet<ConfigurationKey> ConfigurationKeys { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<UserRole> UserRoles { get; set; } = null!;
        public DbSet<Audit> Audits { get; set; } = null!;
        public DbSet<Language> Languages { get; set; } = null!;
        public DbSet<UserPermission> UserPermissions { get; set; } = null!;
        public DbSet<UserPermissionToRole> UserPermissionToRoles { get; set; } = null!;
        public DbSet<UserRoleToLanguage> UserRolesToLanguages { get; set; } = null!;
    }
}
