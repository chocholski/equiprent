using Equiprent.ApplicationInterfaces.Files.Models;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Files.Models.Archives.Saving
{
    public record FileArchiveSavingResult : FileResultBase, IFileArchiveSavingResult
    {
        public required string FileName { get; set; }

        public required string FilePath
        {
            get => GetPathWithoutMainFileFolderPath(_filePath)!;
            set => _filePath = value;
        }

        public string? RelativePath
        {
            get
            {
                if (Status != FileArchiveSavingResultEnum.Success)
                    return null;

                return Path.Combine(ZipPath!, FileName);
            }
        }

        public required FileArchiveSavingResultEnum Status { get; set; }

        public required string ZipPath
        {
            get => GetPathWithoutMainFileFolderPath(_zipPath)!;
            set => _zipPath = value;
        }

        private string? _filePath { get; set; }

        private string? _zipPath { get; set; }

        private FileArchiveSavingResult(IConfiguration configuration) : base(configuration) { }

        public static FileArchiveSavingResult Create(IConfiguration configuration, IFileSavingResult fileSavingResult, string zipPath)
        {
            return new FileArchiveSavingResult(configuration)
            {
                FileName = fileSavingResult.FileName,
                FilePath = fileSavingResult.FilePath,
                Status = fileSavingResult.Status.ToFileArchiveSavingStatus(),
                ZipPath = zipPath
            };
        }
    }
}
