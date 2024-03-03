using System;
using System.IO.Compression;
using System.Linq;

namespace Equiprent.Extensions
{
    public static class ZipArchiveExtensions
    {
        public static bool ContainsFileWithName(this ZipArchive zipArchive, string fileName)
        {
            return zipArchive.Entries.Any(entry => entry.Name.Equals(fileName, StringComparison.OrdinalIgnoreCase));
        }
    }
}
