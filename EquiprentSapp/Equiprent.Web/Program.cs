namespace Equiprent.Web
{
    public class Program
    {
        public static readonly string AppName = "Equiprent";
        internal static readonly string CorsPolicyName = "AllowAll";
        internal static readonly string ConfigRootPath = "wwwroot";
        internal static readonly string ConnectionName = "DefaultConnection";

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
}