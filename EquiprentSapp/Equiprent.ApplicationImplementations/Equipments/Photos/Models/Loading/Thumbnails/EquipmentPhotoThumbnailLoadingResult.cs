using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading.Thumbnails;
using System.Drawing;

namespace Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading.Thumbnails
{
    public record EquipmentPhotoThumbnailLoadingResult : IEquipmentPhotoThumbnailLoadingResult
    {
        public EquipmentPhotoThumbnailLoadingResultEnum Status
        {
            get => Thumbnail is null ? EquipmentPhotoThumbnailLoadingResultEnum.Error : _status;
            set => _status = value;
        }

        public Image? Thumbnail { get; set; }

        private EquipmentPhotoThumbnailLoadingResultEnum _status;

        public EquipmentPhotoThumbnailLoadingResult()
        {
            Status = EquipmentPhotoThumbnailLoadingResultEnum.Unknown;
        }
    }
}
