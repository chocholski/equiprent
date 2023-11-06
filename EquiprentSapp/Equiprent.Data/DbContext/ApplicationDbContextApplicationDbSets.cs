using Equiprent.Entities.Application;
using Equiprent.Entities.Application.RefreshToken;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext
    {
        public DbSet<Audit> Audits { get; set; } = null!;
        public DbSet<ConfigurationKey> ConfigurationKeys { get; set; } = null!;
        public DbSet<Language> Languages { get; set; } = null!;
        public DbSet<RefreshToken> RefreshTokens { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<UserPermission> UserPermissions { get; set; } = null!;
        public DbSet<UserPermissionToRole> UserPermissionToRoles { get; set; } = null!;
        public DbSet<UserPermissionToUserPermission> UserPermissionToUserPermissions { get; set; } = null!;
        public DbSet<UserRole> UserRoles { get; set; } = null!;
        public DbSet<UserRoleToLanguage> UserRolesToLanguages { get; set; } = null!;
    }
}
