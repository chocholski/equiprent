using Equiprent.ApplicationImplementations.Files.Models.Files.Loading;
using Equiprent.ApplicationImplementations.Files.Models.Files.Saving;
using Equiprent.ApplicationInterfaces.Files;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;
using Microsoft.Extensions.Configuration;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Text;

namespace Equiprent.ApplicationImplementations.Files
{
    public partial class FileService : IFileService
    {
        private readonly IConfiguration _configuration;

        public FileService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetFileNameWithoutExtension(string fileName)
        {
            var fileNameWithoutExtension = fileName[..fileName.LastIndexOf('.')];
            var normalizedFileNameWithoutExtension = fileNameWithoutExtension.Normalize(NormalizationForm.FormD);
            var filteredFileName = normalizedFileNameWithoutExtension
                .Where(c => char.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                .ToArray();

            normalizedFileNameWithoutExtension = new string(filteredFileName).Replace("ł", "l").Replace("Ł", "L");
            normalizedFileNameWithoutExtension = Regex.Replace(normalizedFileNameWithoutExtension, "[^A-Za-z1-9| ]", string.Empty);
            normalizedFileNameWithoutExtension = normalizedFileNameWithoutExtension.Replace(" ", "");

            return normalizedFileNameWithoutExtension;
        }

        public async Task<IFileLoadingResult> LoadAsync(IFileArchiveLoadingResult fileArchiveLoadingResult)
        {
            var result = FileLoadingResult.Create(_configuration, fileArchiveLoadingResult);
            if (fileArchiveLoadingResult.Status != FileArchiveLoadingResultEnum.Success)
                return result;

            try
            {
                var filePath = result.FilePath!;
                using var fileStream = File.OpenRead(filePath);
                var file = new byte[fileStream.Length];
                await fileStream.ReadAsync(file);
                Directory.Delete(filePath, recursive: true);

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
    }
}
