using Equiprent.ApplicationInterfaces.Users;
using Equiprent.ApplicationInterfaces.Createables;
using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.ApplicationInterfaces.UserPermissions;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Web.Infrastructure;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
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
            builder.Services.AddTransient<ICreateableService, CreateableService>();
            builder.Services.AddTransient<IDbContextSavingHandler, DbContextSavingWithAuditingHandler>();
            builder.Services.AddTransient<IDbStatementBuilder, DbStatementBuilder>();
            builder.Services.AddTransient<IAuditKeyValueService, AuditKeyValueService>();
            builder.Services.AddTransient<ILanguageableService, LanguageableService>();
            builder.Services.AddTransient<IPasswordHasher, PasswordHasher>();
            builder.Services.AddTransient<ISpecialFilterBuilder, SpecialFilterBuilder>();
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IUserPermissionService, UserPermissionService>();

            builder.Services.AddCommandQueryHandler(typeof(ICommandHandler<>));
            builder.Services.AddCommandQueryHandler(typeof(ICommandHandler<,>));
            builder.Services.AddCommandQueryHandler(typeof(IQueryHandler<,>));

            builder.Services.AddScoped<ICommandDispatcher, CommandDispatcher>();
            builder.Services.AddScoped<IIdentityService, IdentityService>();
            builder.Services.AddScoped<IQueryDispatcher, QueryDispatcher>();
        }
    }
}
