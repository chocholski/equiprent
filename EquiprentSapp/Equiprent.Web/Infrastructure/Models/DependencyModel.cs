namespace Equiprent.Web.Infrastructure.Models
{
    internal sealed class DependencyModel
    {
        public Type InterfaceType { get; init; }
        public Type InterfaceImplementerType { get; init; }

        public DependencyModel(Type interfaceType, Type interfaceImplementerType)
        {
            InterfaceType = interfaceType;
            InterfaceImplementerType = interfaceImplementerType;
        }
    }
}
