using EquiprentAPI.Web;

namespace Equiprent.Web.Installers
{
    public static class InstallerExtensions
    {
        public static void InstallServicesInAssembly(this WebApplicationBuilder builder)
        {
            typeof(Program).Assembly.ExportedTypes
                .Where(t => typeof(IInstaller).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
                .Select(Activator.CreateInstance)
                .Cast<IInstaller>()
                .ToList()
                .ForEach(i => i.InstallServices(builder));
        }
    }
}
