namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Saving
{
    public static class EquipmentPhotoSavingResultExtensions
    {
        public static bool IsSuccess(this EquipmentPhotoSavingResultEnum status) => status == EquipmentPhotoSavingResultEnum.Success;
    }
}
