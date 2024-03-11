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

        public string UnZipDirectoryPath
        {
            get
            {
                var splitFilePath = FilePath.Split('\\');
                if (splitFilePath.Length == 1)
                {
                    splitFilePath = splitFilePath[0].Split('/');
                }

                return FilePath.Replace(splitFilePath.Last(), string.Empty);
            }
        }

        public string FilePath { get; init; }

        public FileLoadingResultEnum Status
        {
            get => _status == FileLoadingResultEnum.Success && File.IsNullOrEmpty() ? FileLoadingResultEnum.Error : _status;
            set => _status = value;
        }

        private FileLoadingResultEnum _status;

        public FileLoadingFromArchiveResult(IConfiguration configuration, IFileArchiveLoadingResult fileArchiveLoadingResult) : base(configuration)
        {
            FilePath = GetPathWithoutMainFileFolderPath(fileArchiveLoadingResult.FilePath)!;
            Status = fileArchiveLoadingResult.Status.ToFileLoadingResultStatus();
        }
    }
}
