using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Diagnostics;
using LocalService.ServiceBaseClasses;
using Equiprent.Data;
using System.Text;
using System.Collections.Generic;
using Equiprent.Data.Services;
using Equiprent.ApplicationServices.Audit;

namespace LocaleService
{
    class Program
    {
        public static async Task Main(string[] args)
        {
            var configuration = LocalService.Infrastructure.ConfigurationManager.GetConfiguration();

            Console.WriteLine("Start");

            var isService = !(Debugger.IsAttached || args.ToList().Contains("--console"));
            var builder = new HostBuilder()
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddDbContext<ApplicationDbContext>(options =>
                        options
                            .UseLazyLoadingProxies()
                            .UseMySql(
                                configuration.GetConnectionString("DefaultConnection"),
                                new MariaDbServerVersion(new Version(major: 10, minor: 3, build: 2)),
                                optionsBuilder =>
                                {
                                    optionsBuilder.MigrationsAssembly("Equiprent.Data");
                                    optionsBuilder.EnableRetryOnFailure(maxRetryCount: 10, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                                }
                    ));

                    services.Add(new ServiceDescriptor(typeof(IHttpContextAccessor), typeof(HttpContextAccessor), ServiceLifetime.Singleton));
                    services.Add(new ServiceDescriptor(typeof(IUserService), typeof(UserService), ServiceLifetime.Transient));
                    services.Add(new ServiceDescriptor(typeof(IKeyAtAuditValueService), typeof(KeyAtAuditValueService), ServiceLifetime.Transient));
                    services.AddSingleton(BuildLogger);
                    services.AddSingleton(configuration);
                    AddHostedServiesToServices(services, configuration);
                })
                .ConfigureLogging((hostContext, loggingBuilder) => {
                    loggingBuilder.AddSerilog(loggingBuilder.Services.BuildServiceProvider().GetRequiredService<ILogger>(), dispose: true);
                });

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            if (isService)
            {
                await builder.RunAsServiceAsync();
            }
            else
            {
                Console.WriteLine("Console Start");

                await builder.RunConsoleAsync();
            }
        }

        private static ILogger BuildLogger(IServiceProvider provider)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.GetDirectoryName(Process.GetCurrentProcess()?.MainModule?.FileName)!)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.MachineName}.json", optional: true)
                .AddEnvironmentVariables();

            var configuration = builder.Build();

            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();

            return Log.Logger;
        }

        private static List<int>? GetServicesToRun(IConfigurationRoot configuration)
        {
            var confValue = configuration["ServicesToRun"];

            if (!string.IsNullOrEmpty(confValue))
            {
                var result = new List<int>();
                var serviceIds = confValue.Split(',');

                foreach (var serviceId in serviceIds)
                {
                    result.Add(Convert.ToInt32(serviceId));
                }
                return result;
            }
            return null;
        }

        private static void AddHostedServiesToServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            var servicesToRun = GetServicesToRun(configuration);

            if (servicesToRun is not null && servicesToRun.Count > 0)
            {
                foreach (var serviceToRun in servicesToRun)
                {
                    switch (serviceToRun)
                    {
                        case 1:
                            //services.AddHostedService<MailSenderService>();
                            break;
                    }
                }
            }
            else
            {
                //services.AddHostedService<MailSenderService>();
            }
        }
    }
}
