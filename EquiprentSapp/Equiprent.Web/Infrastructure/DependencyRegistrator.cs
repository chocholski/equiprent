using Equiprent.Web.Infrastructure.Models;

namespace Equiprent.Web.Infrastructure
{
    public static class DependencyRegistrar
    {
        public static void AddCommandQueryHandler(this IServiceCollection services, Type dependencyInterfaceType)
        {
            var dependencies = dependencyInterfaceType.Assembly
                .GetTypes()
                .Where(type => type
                    .GetInterfaces()
                    .Any(type =>
                        type.IsGenericType &&
                        type.GetGenericTypeDefinition() == dependencyInterfaceType))
                .Select(type => new DependencyModel(interfaceType: dependencyInterfaceType, interfaceImplementerType: type));

            foreach (var dependency in dependencies)
                services.AddScoped(dependency.InterfaceType, dependency.InterfaceImplementerType);
        }
    }
}
