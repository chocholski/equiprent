using Equiprent.ApplicationInterfaces.Abstractions;

namespace Equiprent.ApplicationImplementations.Photos
{
    public record PhotoDimensions : IDimensionable
    {
        public double Height { get; set; }
        public double Width { get; set; }

        public PhotoDimensions(double height, double width)
        {
            Height = height;
            Width = width;
        }
    }
}
