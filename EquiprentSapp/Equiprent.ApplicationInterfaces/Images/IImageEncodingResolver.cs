using SkiaSharp;

namespace Equiprent.ApplicationInterfaces.Images
{
    public interface IImageEncodingResolver
    {
        public SKEncodedImageFormat? GetEncodedImageFormatForFileName(string fileName);
    }
}
