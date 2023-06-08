using Equiprent.Web.Installers;
using Serilog;

namespace EquiprentAPI.Web
{
    public class Program
    {
        public static readonly string AppName = "Equiprent";
        internal static readonly string CorsPolicyName = "AllowAll";
        internal static readonly string ConfigRootPath = "wwwroot";

        public static void Main(string[] args)
        {
            CurrentDirectoryHelper.SetCurrentDirectory();

            WebApplication
                .CreateBuilder(args)
                .ConfigureBuilder()
                .Build()
                .ConfigureApp()
                .Run();
        }
    }

    internal static class Extensions
    {
        internal static WebApplicationBuilder ConfigureBuilder(this WebApplicationBuilder builder)
        {
            builder.Host.UseSerilog((context, config) =>
            {
                config.ReadFrom.Configuration(context.Configuration);
            });

            builder.Configuration
                .SetBasePath(builder.Environment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.MachineName}.json", optional: true)
                .AddEnvironmentVariables();

            builder.InstallServicesInAssembly();

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            return builder;
        }

        internal static WebApplication ConfigureApp(this WebApplication app)
        {
            app.UseSwagger();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwaggerUI(config => {
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", $"{Program.AppName} API V1");
                    config.RoutePrefix = string.Empty;
                });

                app.UseDeveloperExceptionPage();
            }
            else if (app.Environment.IsProduction())
            {
                app.UseHttpsRedirection();
            }

            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseCors(Program.CorsPolicyName);
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            app.MigrateDatabase();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = Program.ConfigRootPath;

                if (app.Environment.IsDevelopment())
                {
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(30);
                }
            });

            return app;
        }

        internal static void MigrateDatabase(this WebApplication app)
        {
            var serviceScopeFactory = app.Services.GetService<IServiceScopeFactory>();

            if (serviceScopeFactory is not null)
            {
                using var serviceScope = serviceScopeFactory.CreateScope();
                var context = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                context.Database.Migrate();
            }
        }
    }
}