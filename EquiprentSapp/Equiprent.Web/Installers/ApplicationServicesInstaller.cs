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
            builder.Services.Add(new ServiceDescriptor(typeof(IPasswordHasher), typeof(PasswordHasher), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(IHttpContextAccessor), typeof(HttpContextAccessor), ServiceLifetime.Singleton));
            builder.Services.Add(new ServiceDescriptor(typeof(IAuditMemberTranslatorService), typeof(AuditMemberTranslatorService), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(IKeyAtAuditValueService), typeof(KeyAtAuditValueService), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(IUserService), typeof(UserService), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(IUserPermissionsService), typeof(UserPermissionsService), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(ICreateableService), typeof(CreateableService), ServiceLifetime.Transient));
            builder.Services.Add(new ServiceDescriptor(typeof(ILanguageableService), typeof(LanguageableService), ServiceLifetime.Transient));
            builder.Services.AddCommandQueryHandler(typeof(ICommandHandler<>), AppDomain.CurrentDomain.Load($"{Program.AppName}.Logic"));
            builder.Services.AddCommandQueryHandler(typeof(ICommandHandler<,>), AppDomain.CurrentDomain.Load($"{Program.AppName}.Logic"));
            builder.Services.AddCommandQueryHandler(typeof(IQueryHandler<,>), AppDomain.CurrentDomain.Load($"{Program.AppName}.Logic"));

            builder.Services.AddScoped<ICommandDispatcher, CommandDispatcher>();
            builder.Services.AddScoped<IQueryDispatcher, QueryDispatcher>();

            builder.Services.Add(new ServiceDescriptor(typeof(ICommandDispatcher), typeof(CommandDispatcher), ServiceLifetime.Scoped));
            builder.Services.Add(new ServiceDescriptor(typeof(IQueryDispatcher), typeof(QueryDispatcher), ServiceLifetime.Scoped));

            builder.Services.Add(new ServiceDescriptor(typeof(IAuthorizationPolicyProvider), typeof(PermissionPolicyProvider), ServiceLifetime.Singleton));
            builder.Services.Add(new ServiceDescriptor(typeof(IAuthorizationHandler), typeof(PermissionAuthorizationHandler), ServiceLifetime.Singleton));
        }
    }
}
