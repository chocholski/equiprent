using Equiprent.Entities.Application.Audits;
using Equiprent.Entities.Application.ConfigurationKeys;
using Equiprent.Entities.Application.Countries;
using Equiprent.Entities.Application.Languages;
using Equiprent.Entities.Application.RefreshTokens;
using Equiprent.Entities.Application.UserPermissions;
using Equiprent.Entities.Application.UserPermissionToRoles;
using Equiprent.Entities.Application.UserPermissionToUserPermissions;
using Equiprent.Entities.Application.UserRoles;
using Equiprent.Entities.Application.UserRoleToLanguages;
using Equiprent.Entities.Application.Users;
using Equiprent.Entities.Business.CountryToLanguages;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext
    {
        public DbSet<Audit> Audits { get; set; } = null!;
        public DbSet<ConfigurationKey> ConfigurationKeys { get; set; } = null!;
        public DbSet<Country> Countries { get; set; } = null!;
        public DbSet<CountryToLanguage> CountryToLanguages { get; set; } = null!;
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
