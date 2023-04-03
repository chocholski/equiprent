using System.Reflection;

namespace Equiprent.Web.Infrastructure
{
    public static class DependencyRegistrator
    {
        public static void AddCommandQueryHandler(this IServiceCollection services, Type handlerInterface, Assembly assembly)
        {
            var handlers = assembly
                .GetTypes()
                .Where(type => type.GetInterfaces()
                .Any(type => type.IsGenericType && type.GetGenericTypeDefinition() == handlerInterface)
            );

            foreach (var handler in handlers)
            {
                services.AddScoped(handler.GetInterfaces().First(type => type.IsGenericType && type.GetGenericTypeDefinition() == handlerInterface), handler);
            }
        }
    }
}
