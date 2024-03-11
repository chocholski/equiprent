using Equiprent.ApplicationInterfaces.Abstractions;

namespace Equiprent.ApplicationImplementations.Photos
{
    public record PhotoDimensions : IDimensionable
    {
        public float Height { get; set; }
        public float Width { get; set; }

        public PhotoDimensions(float height, float width)
        {
            Height = height;
            Width = width;
        }
    }
}
