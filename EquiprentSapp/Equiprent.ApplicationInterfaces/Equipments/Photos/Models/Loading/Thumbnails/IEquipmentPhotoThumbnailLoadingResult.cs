using SkiaSharp;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading.Thumbnails
{
    public interface IEquipmentPhotoThumbnailLoadingResult
    {
        public EquipmentPhotoThumbnailLoadingResultEnum Status { get; set; }

        public SKBitmap? Thumbnail { get; set; }
    }
}
