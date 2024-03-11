using Equiprent.ApplicationInterfaces.Images;
using SkiaSharp;

namespace Equiprent.ApplicationImplementations.Images
{
    public class ImageEncodingResolver : IImageEncodingResolver
    {
        private static readonly Dictionary<string, SKEncodedImageFormat> _extensionToFormat = new()
        {
            { "astc", SKEncodedImageFormat.Astc },
            { "avif", SKEncodedImageFormat.Avif },
            { "bmp", SKEncodedImageFormat.Bmp },
            { "dng", SKEncodedImageFormat.Dng },
            { "gif", SKEncodedImageFormat.Gif },
            { "heic", SKEncodedImageFormat.Heif },
            { "heif", SKEncodedImageFormat.Heif },
            { "jpg", SKEncodedImageFormat.Jpeg },
            { "jpeg", SKEncodedImageFormat.Jpeg },
            { "ktx", SKEncodedImageFormat.Ktx },
            { "pkm", SKEncodedImageFormat.Pkm },
            { "png", SKEncodedImageFormat.Png },
            { "wbmp", SKEncodedImageFormat.Wbmp },
            { "webp", SKEncodedImageFormat.Webp }
        };

        public SKEncodedImageFormat? GetEncodedImageFormatForFileName(string fileName)
        {
            var fileExtension = Path.GetExtension(fileName)
                .Replace(".", string.Empty)
                .ToLower();

            if (_extensionToFormat.TryGetValue(fileExtension, out SKEncodedImageFormat format))
            {
                return format;
            }

            return null;
        }
    }
}
