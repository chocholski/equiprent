namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading
{
    public static class EquipmentPhotoLoadingResultExtensions
    {
        public static bool IsSuccess(this EquipmentPhotoLoadingResultEnum status) => status == EquipmentPhotoLoadingResultEnum.Success;
    }
}
