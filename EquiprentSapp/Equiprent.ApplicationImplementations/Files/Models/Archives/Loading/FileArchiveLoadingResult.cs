using Equiprent.ApplicationInterfaces.Files.Models;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Files.Models.Archives.Loading
{
    public record FileArchiveLoadingResult : FileResultBase, IFileArchiveLoadingResult
    {
        public string FileName { get; }

        public string? FilePath
        {
            get => Status == FileArchiveLoadingResultEnum.Success ? Path.Combine(UnZipPath, FileName) : null;
        }

        public FileArchiveLoadingResultEnum Status { get; set; } = FileArchiveLoadingResultEnum.Unknown;

        public string UnZipPath { get; }

        public string ZipPath { get; }

        public FileArchiveLoadingResult(
            IConfiguration configuration,
            string zipPath,
            string unZipPath,
            string fileName) : base(configuration)
        {
            FileName = fileName;
            UnZipPath = GetPathWithoutMainFileFolderPath(unZipPath)!;
            ZipPath = GetPathWithoutMainFileFolderPath(zipPath)!;
        }
    }
}
