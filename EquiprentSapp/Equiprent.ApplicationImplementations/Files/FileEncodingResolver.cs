using Equiprent.ApplicationInterfaces.Files;
using System.Drawing.Imaging;

namespace Equiprent.ApplicationImplementations.Files
{
#pragma warning disable CA1416 // Validate platform compatibility
    public class FileEncodingResolver : IFileEncodingResolver
    {
        private static readonly Dictionary<string, string> _extensionToMimeType = new()
            {
                { "bmp", "bmp" },
                { "dib", "bmp" },
                { "rle", "bmp" },
                { "jpg", "jpeg" },
                { "jpeg", "jpeg" },
                { "jpe", "jpeg" },
                { "jfif", "jpeg" },
                { "gif", "gif" },
                { "tif", "tiff" },
                { "tiff", "tiff" },
                { "png", "png" }
            };

        public ImageCodecInfo? GetEncoderForFileName(string fileName)
        {
            var fileExtension = fileName.Split('.').Last();

            if (_extensionToMimeType.TryGetValue(fileExtension.ToLower(), out string? mimeType))
            {
                mimeType = $"image/{mimeType}";
                return ImageCodecInfo.GetImageEncoders().FirstOrDefault(encoder => encoder.MimeType == mimeType);
            }

            return null;
        }
    }
#pragma warning restore CA1416 // Validate platform compatibility
}
