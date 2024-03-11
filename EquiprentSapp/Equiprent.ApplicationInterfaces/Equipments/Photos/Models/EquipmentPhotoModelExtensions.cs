using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Saving;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models
{
    public static class EquipmentPhotoModelExtensions
    {
        public static string GetFileNameWithExtension(this IEquipmentPhotoModel model, Guid seed)
        {
            if (model.IsLoadingModel())
                return model.FileNameWithExtension;

            if (model.IsSavingModel())
                return $"{seed}{Path.GetExtension(model.FileNameWithExtension) ?? string.Empty}";

            return string.Empty;
        }

        private static bool IsLoadingModel(this IEquipmentPhotoModel model) => typeof(IEquipmentPhotoLoadingModel).IsAssignableFrom(model.GetType());

        private static bool IsSavingModel(this IEquipmentPhotoModel model) => typeof(IEquipmentPhotoSavingModel).IsAssignableFrom(model.GetType());
    }
}
