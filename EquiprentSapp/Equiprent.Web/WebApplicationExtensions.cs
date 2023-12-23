using Equiprent.ApplicationInterfaces.Database.Events.Saving;
using Equiprent.Data.DbContext;
using Equiprent.Web.Installers;
using Serilog;

namespace Equiprent.Web
{
    public static class WebApplicationExtensions
    {
        private static string GetApplicationJsonName(bool withMachineSpecificName) =>
            $"appsettings{(withMachineSpecificName ? $".{Environment.MachineName}" : string.Empty)}.json";

        internal static WebApplicationBuilder ConfigureBuilder(this WebApplicationBuilder builder)
        {
            builder.Host.UseSerilog((context, config) =>
            {
                config.ReadFrom.Configuration(context.Configuration);
            });

            builder.Configuration
                .SetBasePath(builder.Environment.ContentRootPath)
                .AddJsonFile(GetApplicationJsonName(withMachineSpecificName: false), optional: true, reloadOnChange: true)
                .AddJsonFile(GetApplicationJsonName(withMachineSpecificName: true), optional: true)
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
                app.UseHttpsRedirection();

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
                using var serviceScope = serviceScopeFactory.CreateScope() ?? throw new Exception("ServiceScope is null!");
                var context = serviceScope!.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                context!.Database.Migrate();
            }
        }
    }
}
