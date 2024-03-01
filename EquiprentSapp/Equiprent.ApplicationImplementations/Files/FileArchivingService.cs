using Equiprent.ApplicationImplementations.Files.Models.Archives.Loading;
using Equiprent.ApplicationImplementations.Files.Models.Archives.Saving;
using Equiprent.ApplicationInterfaces.Files;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;
using Microsoft.Extensions.Configuration;
using System.IO.Compression;

namespace Equiprent.ApplicationImplementations.Files
{
#pragma warning disable CA1822 // Mark members as static
    public class FileArchivingService : IFileArchivingService
    {
        private readonly IConfiguration _configuration;

        public FileArchivingService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IFileArchiveLoadingResult Load(string zipPath, string unZipDestinationPath, string fileName)
        {
            var result = new FileArchiveLoadingResult(_configuration, zipPath, unZipDestinationPath, fileName);

            try
            {
                if (!File.Exists(result.ZipPath))
                {
                    return result with { Status = FileArchiveLoadingResultEnum.NonExistent };
                }

                Directory.CreateDirectory(result.UnZipDestinationPath);
                using var zipArchive = ZipFile.Open(result.ZipPath, ZipArchiveMode.Read);
                zipArchive.ExtractToDirectory(result.UnZipDestinationPath, overwriteFiles: true);
                return result with { Status = FileArchiveLoadingResultEnum.Success };
            }
            catch
            {
                return result with { Status = FileArchiveLoadingResultEnum.Error };
            }
        }

        public IFileArchiveSavingResult Save(IFileSavingResult fileSavingResult, string zipPath)
        {
            var result = FileArchiveSavingResult.Create(_configuration, fileSavingResult, zipPath);
            if (fileSavingResult.Status != FileSavingResultEnum.Success)
                return result;

            try
            {
                using var zipArchive = ZipFile.Open(result.ZipPath, GetZipArchiveModeForPath(result.ZipPath));
                zipArchive.CreateEntryFromFile(result.FilePath, result.FileName);
                File.Delete(result.FilePath);
            }
            catch
            {
                return result with { Status = FileArchiveSavingResultEnum.Error };
            }

            return result with { Status = FileArchiveSavingResultEnum.Success };
        }

        private ZipArchiveMode GetZipArchiveModeForPath(string zipPath) => !File.Exists(zipPath) ? ZipArchiveMode.Create : ZipArchiveMode.Update;
    }
#pragma warning restore CA1822 // Mark members as static
}
