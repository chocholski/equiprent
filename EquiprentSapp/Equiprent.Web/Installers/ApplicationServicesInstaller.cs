using Equiprent.ApplicationInterfaces.Users;
using Equiprent.ApplicationInterfaces.Createables;
using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.ApplicationInterfaces.UserPermissions;
using Equiprent.ApplicationInterfaces.Identities;
using Equiprent.ApplicationInterfaces.Audits.AuditMemberTranslators;
using Equiprent.ApplicationImplementations.Audits.AuditMemberTranslators;
using Equiprent.ApplicationImplementations.Createables;
using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders;
using Equiprent.ApplicationImplementations.Database.DbStatementBuilders;
using Equiprent.ApplicationInterfaces.Audits.AuditKeyValues;
using Equiprent.ApplicationImplementations.UserPermissions;
using Equiprent.ApplicationImplementations.Audits.AuditKeyValues;
using Equiprent.ApplicationImplementations.Languageables;
using Equiprent.ApplicationInterfaces.Users.Passwords;
using Equiprent.ApplicationImplementations.Users.Passwords;
using Equiprent.ApplicationInterfaces.Database.Filtering.SpecialFiltering;
using Equiprent.ApplicationImplementations.Database.Filtering.SpecialFiltering;
using Equiprent.ApplicationImplementations.Users;
using Equiprent.ApplicationImplementations.Identities;
using Equiprent.ApplicationInterfaces.Database.Events.Saving;
using Equiprent.ApplicationImplementations.Database.Events.Saving;
using Equiprent.ApplicationInterfaces.Identities.Tokens;
using Equiprent.ApplicationImplementations.Identities.Tokens;
using Equiprent.ApplicationInterfaces.Users.Languages;
using Equiprent.ApplicationImplementations.Users.Languages;
using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationImplementations.CommandResults;

namespace Equiprent.Web.Installers
{
    public class ApplicationServicesInstaller : IInstaller
    {
        public void InstallServices(WebApplicationBuilder builder)
        {
            builder.Services.AddSingleton(builder.Configuration);
            builder.Services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();
            builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();
            builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            builder.Services.AddTransient<IAuditMemberTranslatorService, AuditMemberTranslatorService>();
            builder.Services.AddTransient<ICommandResultService, CommandResultService>();
            builder.Services.AddTransient<ICreateableService, CreateableService>();
            builder.Services.AddTransient<IDbContextSavingStrategy, DbContextSavingWithAuditingStrategy>();
            builder.Services.AddTransient<IDbStatementBuilder, DbStatementBuilder>();
            builder.Services.AddTransient<IAuditKeyValueService, AuditKeyValueService>();
            builder.Services.AddTransient<ILanguageableService, LanguageableService>();
            builder.Services.AddTransient<IPasswordHasher, PasswordHasher>();
            builder.Services.AddTransient<ISpecialFilterBuilder, SpecialFilterBuilder>();
            builder.Services.AddTransient<ITokenRefreshService, TokenRefreshService>();
            builder.Services.AddTransient<IUserLanguageService, UserLanguageService>();
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IUserPermissionService, UserPermissionService>();

            builder.Services.AddScoped<IIdentityService, IdentityService>();
        }
    }
}
