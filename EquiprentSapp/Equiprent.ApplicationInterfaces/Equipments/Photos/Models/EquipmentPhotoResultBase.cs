using Equiprent.ApplicationInterfaces.Files;
using Equiprent.Extensions;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models
{
    public record EquipmentPhotoResultBase
    {
        public string DefaultPath
        {
            get => Path.Combine(_mainFolderPath, IEquipmentPhotoService.EquipmentPhotosFolderPath);
        }

        public string ZipPath
        {
            get => Path.Combine(DefaultPath, string.IsNullOrEmpty(SplitPath[0]) ? SplitPath[1] : SplitPath[0]);
        }

        public string FileNameWithoutExtension { get; }

        public string[] SplitPath { get; }

        public string UnZipPath
        {
            get => Path.Combine(DefaultPath, $"TEMP{FileNameWithoutExtension}");
        }

        private readonly IFileService _fileService;
        private readonly string _mainFolderPath;

        public EquipmentPhotoResultBase(
            IConfiguration configuration,
            IFileService fileService,
            IEquipmentPhotoLoadingModel photo)
        {
            var mainFileFolderPath = configuration["Paths:MainFileFolder"];
            if (string.IsNullOrEmpty(mainFileFolderPath))
                throw new MissingEntryInConfigurationException("Main File Folder Path!");

            _fileService = fileService;
            _mainFolderPath = mainFileFolderPath;
            FileNameWithoutExtension = _fileService.GetFileNameWithoutExtension(photo.FileName);
            SplitPath = GetSplitPath(photo.RelativePath);
        }

        private static string[] GetSplitPath(string filePath)
        {
            var normalizedFilePath = filePath
                .Replace(IEquipmentPhotoService.EquipmentPhotosFolderPath, string.Empty)
                .Replace(IEquipmentPhotoService.EquipmentPhotosFolderPath.Replace('\\', '/'), string.Empty);

            var splitPath = normalizedFilePath.Split('\\');
            if (splitPath.Length == 1)
            {
                splitPath = splitPath.First().Split('/');
            }

            return splitPath!;
        }
    }
}
