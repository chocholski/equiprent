namespace Equiprent.Web.Installers
{
    public interface IInstaller
    {
        void InstallServices(WebApplicationBuilder builder);
    }
}
