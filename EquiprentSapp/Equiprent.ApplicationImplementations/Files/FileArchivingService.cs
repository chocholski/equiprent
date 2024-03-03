﻿using Equiprent.ApplicationImplementations.Files.Models.Archives.Loading;
using Equiprent.ApplicationImplementations.Files.Models.Archives.Saving;
using Equiprent.ApplicationInterfaces.Files;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Deletion;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;
using Equiprent.Extensions;
using Microsoft.Extensions.Configuration;
using System.IO.Compression;

namespace Equiprent.ApplicationImplementations.Files
{
#pragma warning disable CA1822 // Mark members as static
    public class FileArchivingService : IFileArchivingService
    {
        private readonly IConfiguration _configuration;
        private readonly IFileService _fileService;

        public FileArchivingService(
            IConfiguration configuration,
            IFileService fileService)
        {
            _configuration = configuration;
            _fileService = fileService;
        }

        public IFileArchiveLoadingResult Load(string zipPath, string unZipPath, string fileName)
        {
            var result = new FileArchiveLoadingResult(_configuration, zipPath, unZipPath, fileName);

            try
            {
                using var zipFile = ZipFile.OpenRead(result.ZipPath);
                if (zipFile is null || !zipFile.ContainsFileWithName(result.FileName))
                    return result with { Status = FileArchiveLoadingResultEnum.NotFound };

                Directory.CreateDirectory(result.UnZipPath);
                using var zipArchive = ZipFile.Open(result.ZipPath, ZipArchiveMode.Read);
                zipArchive.ExtractToDirectory(result.UnZipPath, overwriteFiles: true);
                return result with { Status = FileArchiveLoadingResultEnum.Success };
            }
            catch
            {
                return result with { Status = FileArchiveLoadingResultEnum.Error };
            }
        }

        public IFileArchiveSavingResult Save(IFileSavingResult fileSavingResult, string zipPath)
        {
            var result = new FileArchiveSavingResult(_configuration, fileSavingResult, zipPath);
            if (!fileSavingResult.Status.IsSuccess())
            {
                var fileDeletionResult = _fileService.Delete(result.FilePath);
                if (!fileDeletionResult.Status.IsSuccess())
                    return result with { Status = fileDeletionResult.Status.ToFileArchiveSavingStatus() };

                return result;
            }

            try
            {
                using var zipArchive = ZipFile.Open(result.ZipPath, GetZipArchiveModeForPath(result.ZipPath));
                zipArchive.CreateEntryFromFile(result.FilePath, result.FileName);

                var fileDeletionResult = _fileService.Delete(result.FilePath);
                if (!fileDeletionResult.Status.IsSuccess())
                    return result with { Status = fileDeletionResult.Status.ToFileArchiveSavingStatus() };

                return result with { Status = FileArchiveSavingResultEnum.Success };
            }
            catch
            {
                return result with { Status = FileArchiveSavingResultEnum.Error };
            }
        }

        private ZipArchiveMode GetZipArchiveModeForPath(string zipPath) => !File.Exists(zipPath) ? ZipArchiveMode.Create : ZipArchiveMode.Update;
    }
#pragma warning restore CA1822 // Mark members as static
}
