using Equiprent.ApplicationInterfaces.Files.Models;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Equiprent.Extensions;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Files.Models.Files.Loading
{
    public record FileLoadingResult : FileResultBase, IFileLoadingResult
    {
        public byte[]? File { get; set; }

        public required string? FilePath
        {
            get => GetPathWithoutMainFileFolderPath(_filePath);
            set => _filePath = value;
        }

        public required FileLoadingResultEnum Status
        {
            get => _status == FileLoadingResultEnum.Success && File.IsNullOrEmpty() ? FileLoadingResultEnum.Error : _status;
            set => _status = value;
        }

        private string? _filePath { get; set; }

        private FileLoadingResultEnum _status { get; set; }

        private FileLoadingResult(IConfiguration configuration) : base(configuration) { }

        public static FileLoadingResult Create(IConfiguration configuration, IFileArchiveLoadingResult fileArchiveLoadingResult)
        {
            return new FileLoadingResult(configuration)
            {
                FilePath = fileArchiveLoadingResult.FilePath,
                Status = MapStatusFromFileArchiveSavingResult(fileArchiveLoadingResult.Status),
            };
        }

        private static FileLoadingResultEnum MapStatusFromFileArchiveSavingResult(FileArchiveLoadingResultEnum status)
        {
            return status switch
            {
                FileArchiveLoadingResultEnum.Error => FileLoadingResultEnum.Error,
                FileArchiveLoadingResultEnum.NonExistent => FileLoadingResultEnum.NotFound,
                FileArchiveLoadingResultEnum.Success => FileLoadingResultEnum.Success,
                _ => FileLoadingResultEnum.Unknown,
            };
        }
    }
}
