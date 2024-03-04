using System.Drawing.Imaging;

namespace Equiprent.ApplicationInterfaces.Files
{
    public interface IFileEncodingResolver
    {
        public ImageCodecInfo? GetEncoderForFileName(string fileName);
    }
}
