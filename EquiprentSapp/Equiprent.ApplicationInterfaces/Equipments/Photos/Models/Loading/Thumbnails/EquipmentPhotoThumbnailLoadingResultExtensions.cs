using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading.Thumbnails
{
    public static class EquipmentPhotoThumbnailLoadingResultExtensions
    {
        public static bool IsSuccess(this EquipmentPhotoThumbnailLoadingResultEnum status) => status == EquipmentPhotoThumbnailLoadingResultEnum.Success;

        public static EquipmentPhotoThumbnailLoadingResultEnum ToEquipmentPhotoThumbnailLoadingResult(this FileLoadingResultEnum status)
        {
            return status switch
            {
                FileLoadingResultEnum.Error or
                FileLoadingResultEnum.NotFound => EquipmentPhotoThumbnailLoadingResultEnum.Error,
                FileLoadingResultEnum.Success => EquipmentPhotoThumbnailLoadingResultEnum.Success,
                _ => EquipmentPhotoThumbnailLoadingResultEnum.Unknown,
            };
        }

        public static EquipmentPhotoLoadingResultEnum ToEquipmentPhotoLoadingStatus(this EquipmentPhotoThumbnailLoadingResultEnum status)
        {
            return status switch
            {
                EquipmentPhotoThumbnailLoadingResultEnum.Error => EquipmentPhotoLoadingResultEnum.Error,
                EquipmentPhotoThumbnailLoadingResultEnum.Success => EquipmentPhotoLoadingResultEnum.Success,
                _ => EquipmentPhotoLoadingResultEnum.Unknown,
            };
        }
    }
}
