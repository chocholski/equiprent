using System.Drawing;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading.Thumbnails
{
    public interface IEquipmentPhotoThumbnailLoadingResult
    {
        public EquipmentPhotoThumbnailLoadingResultEnum Status { get; set; }

        public Image? Thumbnail { get; set; }
    }
}
