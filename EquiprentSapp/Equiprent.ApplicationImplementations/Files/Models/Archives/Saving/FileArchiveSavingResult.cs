using Equiprent.ApplicationInterfaces.Files.Models;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Files.Models.Archives.Saving
{
    public record FileArchiveSavingResult : FileResultBase, IFileArchiveSavingResult
    {
        public string FileName { get; init; }

        public string FilePath { get; init; }

        public string? RelativePath => Status == FileArchiveSavingResultEnum.Success ? Path.Combine(ZipPath, FileName) : null;

        public FileArchiveSavingResultEnum Status { get; set; }

        public string ZipPath { get; init; }

        public FileArchiveSavingResult(
            IConfiguration configuration,
            IFileSavingResult fileSavingResult,
            string zipPath) : base(configuration)
        {
            FileName = fileSavingResult.FileName;
            FilePath = GetPathWithoutMainFileFolderPath(fileSavingResult.FilePath)!;
            Status = fileSavingResult.Status.ToFileArchiveSavingStatus();
            ZipPath = GetPathWithoutMainFileFolderPath(zipPath)!;
        }
    }
}
