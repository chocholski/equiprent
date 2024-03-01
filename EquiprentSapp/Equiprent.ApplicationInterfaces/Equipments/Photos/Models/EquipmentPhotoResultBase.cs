using Equiprent.ApplicationInterfaces.Files;
using Equiprent.Entities.Abstractions;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models
{
    public record EquipmentPhotoResultBase
    {
        public string DefaultPath
        {
            get => Path.Combine(_mainFolderPath, IEquipmentPhotoService.EquipmentPhotosFolderPath);
        }

        public string DirectoryPath
        {
            get => Path.Combine(DefaultPath, string.IsNullOrEmpty(SplitPath[0]) ? SplitPath[1] : SplitPath[0]);
        }

        public string FileNameWithoutExtension { get; private set; }

        public string[] SplitPath { get; private set; }

        public string UnZipPath
        {
            get => Path.Combine(DirectoryPath, $"TEMP{FileNameWithoutExtension}");
        }

        public string ZipPath
        {
            get => Path.Combine(DirectoryPath, SplitPath[2]);
        }

        private readonly IFileService _fileService;
        private readonly string _mainFolderPath;

        public EquipmentPhotoResultBase(
            IConfiguration configuration,
            IFileService fileService,
            string filePath,
            string fileName)
        {
            var mainFileFolderPath = configuration["Paths:MainFileFolder"];
            if (string.IsNullOrEmpty(mainFileFolderPath))
                throw new Exception("Invalid configuration!");

            _fileService = fileService;
            _mainFolderPath = mainFileFolderPath;
            FileNameWithoutExtension = GetFileNameWithoutExtension(fileName);
            SplitPath = GetSplitPath(filePath);
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

        private string GetFileNameWithoutExtension(string fileName)
        {
            return _fileService.GetFileNameWithoutExtension(fileName);
        }
    }
}
