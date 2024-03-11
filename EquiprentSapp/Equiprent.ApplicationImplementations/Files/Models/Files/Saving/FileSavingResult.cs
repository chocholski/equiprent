using Equiprent.ApplicationInterfaces.Files.Models;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Files.Models.Files.Saving
{
    public record FileSavingResult : FileResultBase, IFileSavingResult
    {
        public string FileName { get; init; }

        public string FilePath { get; init; }

        public FileSavingResultEnum Status { get; set; } = FileSavingResultEnum.Unknown;

        public FileSavingResult(IConfiguration configuration, string filePath, string fileName) : base(configuration)
        {
            FilePath = GetPathWithoutMainFileFolderPath(filePath)!;
            FileName = fileName;
        }
    }
}
