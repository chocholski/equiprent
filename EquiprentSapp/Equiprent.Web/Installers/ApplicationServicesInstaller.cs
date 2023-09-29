using Equiprent.ApplicationServices.Users;
using Equiprent.ApplicationServices.Audits;
using Equiprent.ApplicationServices.Createables;
using Equiprent.ApplicationServices.Languageables;
using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.Services;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Web.Infrastructure;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.ApplicationServices.Identities;
using Equiprent.ApplicationServices.Database;

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
            builder.Services.AddTransient<IDbStatementService, DbStatementService>();
            builder.Services.AddTransient<IKeyAtAuditValueService, KeyAtAuditValueService>();
            builder.Services.AddTransient<ILanguageableService, LanguageableService>();
            builder.Services.AddTransient<IPasswordHasher, PasswordHasher>();
            builder.Services.AddTransient<ISpecialFilterService, SpecialFilterService>();
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
