using Equiprent.ApplicationInterfaces.Photos.Resizing;
using SkiaSharp;

namespace Equiprent.ApplicationInterfaces.Images
{
    public interface IImageService
    {
        public SKBitmap GetResizedImage(SKBitmap originalImage, IResizingDimensions resizingDimensions);
    }
}
