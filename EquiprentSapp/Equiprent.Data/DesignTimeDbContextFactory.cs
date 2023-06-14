using System.IO;
using Equiprent.Data.DbContext;
using Microsoft.EntityFrameworkCore.Design;

namespace Equiprent.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), @"..\Equiprent.Web\"))
                .AddJsonFile(@"appsettings.json")
                .AddJsonFile($"appsettings.{Environment.MachineName}.json", optional: true)
                .Build();

            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            builder.UseMySql(connectionString, new MariaDbServerVersion(new Version(10, 3, 2)));

            return new ApplicationDbContext(builder.Options);
        }
    }
}
