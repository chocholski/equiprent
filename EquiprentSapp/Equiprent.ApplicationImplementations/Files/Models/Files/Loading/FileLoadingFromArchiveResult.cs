using Equiprent.ApplicationInterfaces.Files.Models;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Equiprent.Extensions;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Files.Models.Files.Loading
{
    public record FileLoadingFromArchiveResult : FileResultBase, IFileLoadingResult
    {
        public byte[]? File { get; set; }

        public string DirectoryPath
        {
            get
            {
                var filePathWithoutMainFolder = GetPathWithoutMainFileFolderPath(_filePath)!;
                var splitFilePath = filePathWithoutMainFolder.Split('\\');
                if (splitFilePath.Length == 1)
                    splitFilePath = splitFilePath[0].Split('/');

                return filePathWithoutMainFolder.Replace(splitFilePath.Last(), string.Empty);
            }
        }

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

        private FileLoadingFromArchiveResult(IConfiguration configuration) : base(configuration) { }

        public static FileLoadingFromArchiveResult Create(IConfiguration configuration, IFileArchiveLoadingResult fileArchiveLoadingResult)
        {
            return new FileLoadingFromArchiveResult(configuration)
            {
                FilePath = fileArchiveLoadingResult.FilePath,
                Status = fileArchiveLoadingResult.Status.ToFileLoadingResultStatus(),
            };
        }
    }
}
