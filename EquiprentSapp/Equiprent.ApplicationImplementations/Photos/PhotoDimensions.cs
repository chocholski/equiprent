using Equiprent.ApplicationInterfaces.Abstractions;

namespace Equiprent.ApplicationImplementations.Photos
{
    public record PhotoDimensions : IDimensionable
    {
        public float Height { get; init; }
        public float Width { get; init; }

        public PhotoDimensions(float height, float width)
        {
            Height = height;
            Width = width;
        }
    }
}
