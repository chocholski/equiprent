using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace LocalService.Infrastructure
{
    internal class ConfigurationManager
    {
        public static IConfigurationRoot GetConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.GetDirectoryName(Environment.ProcessPath)!)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.MachineName}.json", optional: true)
                .AddEnvironmentVariables();

            return builder.Build();
        }
    }
}
