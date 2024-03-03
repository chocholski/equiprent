using Equiprent.ApplicationInterfaces.Equipments.Photos.Models;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationInterfaces.Files;
using Equiprent.Extensions;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading
{
    public record EquipmentPhotoLoadingResult : EquipmentPhotoResultBase, IEquipmentPhotoLoadingResult
    {
        public byte[]? File { get; set; }

        public string FileName { get; }

        public string FilePath { get; }

        public EquipmentPhotoLoadingResultEnum Status
        {
            get => _status == EquipmentPhotoLoadingResultEnum.Success && File.IsNullOrEmpty() ? EquipmentPhotoLoadingResultEnum.Error : _status;
            set => _status = value;
        }

        private EquipmentPhotoLoadingResultEnum _status;

        public EquipmentPhotoLoadingResult(
            IConfiguration configuration,
            IFileService fileService,
            string filePath,
            string fileName) : base(configuration, fileService, filePath, fileName)
        {
            FileName = fileName;
            FilePath = filePath;
        }
    }
}
