using Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading.Thumbnails;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading.Thumbnails;
using Equiprent.ApplicationInterfaces.Files;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Equiprent.Extensions;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading
{
    public record EquipmentPhotoLoadingResult : EquipmentPhotoResultBase, IEquipmentPhotoLoadingResult
    {
        public byte[]? File => FileLoadingResult?.File;

        public IFileArchiveLoadingResult? FileArchiveLoadingResult { get; set; }
        
        public IFileLoadingResult? FileLoadingResult { get; set; }

        public string FilePath { get; init; }

        public EquipmentPhotoLoadingResultEnum Status
        {
            get => _status == EquipmentPhotoLoadingResultEnum.Success && File.IsNullOrEmpty() ? EquipmentPhotoLoadingResultEnum.Error : _status;
            set => _status = value;
        }
        public IEquipmentPhotoThumbnailLoadingResult ThumbnailLoadingResult { get; set; } = new EquipmentPhotoThumbnailLoadingResult();

        private EquipmentPhotoLoadingResultEnum _status;

        public EquipmentPhotoLoadingResult(
            IConfiguration configuration,
            IFileService fileService,
            IEquipmentPhotoLoadingModel photo) : base(configuration, fileService, photo)
        {
            FilePath = photo.Path!;
        }
    }
}
