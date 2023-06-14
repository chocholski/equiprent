using Equiprent.ApplicationServices.ApplicationUser;
using Equiprent.ApplicationServices.Audit;
using Equiprent.ApplicationServices.Createable;
using Equiprent.ApplicationServices.Languageable;
using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.Services;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Web.Infrastructure;
using EquiprentAPI.Web;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Web.Installers
{
    public class ApplicationServicesInstaller : IInstaller
    {
        public void InstallServices(WebApplicationBuilder builder)
        {
            builder.Services.AddSingleton(builder.Configuration);
            builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();
            builder.Services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();

            builder.Services.AddTransient<IPasswordHasher, PasswordHasher>();
            builder.Services.AddTransient<IAuditMemberTranslatorService, AuditMemberTranslatorService>();
            builder.Services.AddTransient<IKeyAtAuditValueService, KeyAtAuditValueService>();
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IUserPermissionsService, UserPermissionsService>();
            builder.Services.AddTransient<ICreateableService, CreateableService>();
            builder.Services.AddTransient<ILanguageableService, LanguageableService>();

            builder.Services.AddCommandQueryHandler(typeof(ICommandHandler<>), AppDomain.CurrentDomain.Load($"{Program.AppName}.Logic"));
            builder.Services.AddCommandQueryHandler(typeof(ICommandHandler<,>), AppDomain.CurrentDomain.Load($"{Program.AppName}.Logic"));
            builder.Services.AddCommandQueryHandler(typeof(IQueryHandler<,>), AppDomain.CurrentDomain.Load($"{Program.AppName}.Logic"));

            builder.Services.AddScoped<ICommandDispatcher, CommandDispatcher>();
            builder.Services.AddScoped<IQueryDispatcher, QueryDispatcher>();
            builder.Services.AddScoped<ICommandDispatcher, CommandDispatcher>();
            builder.Services.AddScoped<IQueryDispatcher, QueryDispatcher>();
        }
    }
}
