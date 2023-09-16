using Equiprent.Data.DbContext;

namespace Equiprent.Web.Installers
{
    public class DbInstaller : IInstaller
    {
        public void InstallServices(WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options
                    .UseLazyLoadingProxies()
                    .UseMySql(
                        builder.Configuration.GetConnectionString("DefaultConnection"),
                        new MariaDbServerVersion(new Version(major: 10, minor: 3, build: 2)),
                        optionsBuilder =>
                        {
                            optionsBuilder.MigrationsAssembly($"{Program.AppName}.Data");
                            optionsBuilder.EnableRetryOnFailure(maxRetryCount: 10, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                        })
                    );
        }
    }
}
