using Equiprent.ApplicationInterfaces.Abstractions;

namespace Equiprent.ApplicationInterfaces.Photos.Resizing
{
    public interface IResizingDimensions : IDimensionable
    {
        public float ResizingFactor { get; }
    }
}
