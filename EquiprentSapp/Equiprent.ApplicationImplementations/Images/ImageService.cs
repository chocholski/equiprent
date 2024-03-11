using Equiprent.ApplicationInterfaces.Images;
using Equiprent.ApplicationInterfaces.Photos.Resizing;
using SkiaSharp;

namespace Equiprent.ApplicationImplementations.Images
{
    public class ImageService : IImageService
    {
        public SKBitmap GetResizedImage(SKBitmap originalImage, IResizingDimensions resizingDimensions)
        {
            return originalImage.Resize(new SKImageInfo((int)resizingDimensions.Width, (int)resizingDimensions.Height), SKFilterQuality.High);
        }
    }
}
