using Equiprent.ApplicationInterfaces.Files;
using Equiprent.Extensions;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models
{
    public abstract record EquipmentPhotoResultBase
    {
        public string DefaultPath
        {
            get => Path.Combine(_mainFolderPath, IEquipmentPhotoService.EquipmentPhotosFolderPath);
        }

        public string FileNameWithExtension { get; init; }

        public string FileNameWithoutExtension { get; init; }

        protected Guid IdSeed { get; init; } = Guid.NewGuid();

        public string NormalizedFileNameWithoutExtension { get; init; }

        public string[] SplitPath { get; init; }

        public string UnZipPath => Path.Combine(DefaultPath, $"TEMP{NormalizedFileNameWithoutExtension}");

        public string ZipPath => Path.Combine(DefaultPath, string.IsNullOrEmpty(SplitPath[0]) ? SplitPath[1] : SplitPath[0]);

        private readonly string _mainFolderPath;

        public EquipmentPhotoResultBase(
            IConfiguration configuration,
            IFileService fileService,
            IEquipmentPhotoModel photo)
        {
            var mainFileFolderPath = configuration["Paths:MainFileFolder"];
            if (string.IsNullOrEmpty(mainFileFolderPath))
                throw new MissingEntryInConfigurationException("Main File Folder Path!");

            _mainFolderPath = mainFileFolderPath;
            FileNameWithExtension = photo.GetFileNameWithExtension(IdSeed);
            FileNameWithoutExtension = FileNameWithExtension.Replace(Path.GetExtension(FileNameWithExtension), string.Empty);
            NormalizedFileNameWithoutExtension = fileService.GetFileNameWithoutExtension(FileNameWithExtension);
            SplitPath = GetSplitPath(photo.Path);
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
