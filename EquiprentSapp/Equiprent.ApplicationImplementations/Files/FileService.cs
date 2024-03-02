using Equiprent.ApplicationImplementations.Files.Models.Files.Deletion;
using Equiprent.ApplicationImplementations.Files.Models.Files.Loading;
using Equiprent.ApplicationImplementations.Files.Models.Files.Saving;
using Equiprent.ApplicationInterfaces.Files;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Deletion;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Files
{
#pragma warning disable CA1822 // Mark members as static
    public class FileService : IFileService
    {
        private readonly IConfiguration _configuration;
        private readonly IFileNameNormalizer _fileNameNormalizer;

        public FileService(IConfiguration configuration, IFileNameNormalizer fileNameNormalizer)
        {
            _configuration = configuration;
            _fileNameNormalizer = fileNameNormalizer;
        }

        public IFileDeletionResult Delete(string filePath)
        {
            var result = new FileDeletionResult();

            if (!File.Exists(filePath))
                return result with { Status = FileDeletionResultEnum.NotFound };

            try
            {
                File.Delete(filePath);
                return result with { Status = FileDeletionResultEnum.Success };
            }
            catch
            {
                return result with { Status = FileDeletionResultEnum.Error };
            }
        }

        public IDirectoryDeletionResult DeleteDirectory(string directoryPath, bool recursive)
        {
            var result = new DirectoryDeletionResult();

            if (!Directory.Exists(directoryPath))
                return result with { Status = DirectoryDeletionResultEnum.NotFound };

            try
            {
                Directory.Delete(directoryPath, recursive);
                return result with { Status = DirectoryDeletionResultEnum.Success };
            }
            catch
            {
                return result with { Status = DirectoryDeletionResultEnum.Error };
            }
        }

        public string GetFileNameWithoutExtension(string fileName)
        {
            return _fileNameNormalizer.Normalize(fileName, withExtension: false);
        }

        public async Task<IFileLoadingResult> LoadAsync(string filePath)
        {
            var result = new FileLoadingResult(_configuration, filePath);

            try
            {
                var file = await LoadFileAsync(result.FilePath!);

                return result with
                {
                    File = file,
                    Status = FileLoadingResultEnum.Success,
                };
            }
            catch
            {
                return result with { Status = FileLoadingResultEnum.Error };
            }
        }

        public async Task<IFileLoadingResult> LoadAsync(IFileArchiveLoadingResult fileArchiveLoadingResult)
        {
            var result = FileLoadingFromArchiveResult.Create(_configuration, fileArchiveLoadingResult);
            if (!fileArchiveLoadingResult.Status.IsSuccess())
            {
                var directoryDeletionResult = DeleteDirectory(result.DirectoryPath, recursive: true);
                if (!directoryDeletionResult.Status.IsSuccess())
                    return result with { Status = directoryDeletionResult.Status.ToFileLoadingStatus() };

                return result;
            }

            try
            {
                var file = await LoadFileAsync(result.FilePath!);
                var directoryDeletionResult = DeleteDirectory(result.DirectoryPath, recursive: true);
                if (!directoryDeletionResult.Status.IsSuccess())
                    return result with { Status = directoryDeletionResult.Status.ToFileLoadingStatus() };

                return result with
                {
                    File = file,
                    Status = FileLoadingResultEnum.Success
                };
            }
            catch
            {
                return result with { Status = FileLoadingResultEnum.Error };
            }
        }

        public async Task<IFileSavingResult> SaveAsync(byte[] file, string filePath, string fileName)
        {
            var result = new FileSavingResult(_configuration, filePath, fileName);
            if (File.Exists(result.FilePath))
                return result with { Status = FileSavingResultEnum.AlreadyExists };

            try
            {
                using var fileStream = File.Create(result.FilePath);
                await fileStream.WriteAsync(file);
                await fileStream.FlushAsync();
                return result with { Status = FileSavingResultEnum.Success };
            }
            catch
            {
                return result with { Status = FileSavingResultEnum.Error };
            }
        }

        private async Task<byte[]> LoadFileAsync(string filePath)
        {
            try
            {
                using var fileStream = File.OpenRead(filePath);
                var file = new byte[fileStream.Length];
                await fileStream.ReadAsync(file);

                return file;
            }
            catch
            {
                throw;
            }
        }
    }
#pragma warning restore CA1822 // Mark members as static
}
