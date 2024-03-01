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
            get => Status == FileArchiveLoadingResultEnum.Success ? Path.Combine(UnZipDestinationPath, FileName) : null;
        }

        public FileArchiveLoadingResultEnum Status { get; set; }

        public string UnZipDestinationPath { get; }

        public string ZipPath { get; }

        public FileArchiveLoadingResult(
            IConfiguration configuration,
            string zipPath,
            string unZipDestinationPath,
            string fileName) : base(configuration)
        {
            FileName = fileName;
            Status = FileArchiveLoadingResultEnum.Unknown;
            UnZipDestinationPath = GetPathWithoutMainFileFolderPath(unZipDestinationPath)!;
            ZipPath = GetPathWithoutMainFileFolderPath(zipPath)!;
        }
    }
}
