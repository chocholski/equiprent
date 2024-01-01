namespace Equiprent.Web.Installers
{
    public class MediatRInstaller : IInstaller
    {
        public void InstallServices(WebApplicationBuilder builder)
        {
            builder.Services.AddMediatR(config =>
            {
                config.RegisterServicesFromAssemblies(typeof(Program).Assembly, typeof(RequestParameters).Assembly);
            });
        }
    }
}
