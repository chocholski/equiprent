using Equiprent.ApplicationInterfaces.Files.Models;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Equiprent.Extensions;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Files.Models.Files.Loading
{
    public record FileLoadingResult : FileResultBase, IFileLoadingResult
    {
        public byte[]? File { get; set; }

        public string? FilePath
        {
            get => GetPathWithoutMainFileFolderPath(_filePath);
            set => _filePath = value;
        }

        public FileLoadingResultEnum Status
        {
            get => _status == FileLoadingResultEnum.Success && File.IsNullOrEmpty() ? FileLoadingResultEnum.Error : _status;
            set => _status = value;
        }

        private string? _filePath { get; set; }

        private FileLoadingResultEnum _status { get; set; }

        public FileLoadingResult(IConfiguration configuration, string filePath) : base(configuration)
        {
            FilePath = filePath;
            Status = FileLoadingResultEnum.Unknown;
        }
    }
}
