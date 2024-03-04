using Equiprent.ApplicationInterfaces.Abstractions;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos
{
    public interface IEquipmentPhotoService
    {
        public static readonly string EquipmentPhotosFolderPath = @"Uploaded\Equipment\Photos";

        public Task<IEquipmentPhotoLoadingResult> LoadFileWithoutThumbnailAsync(IEquipmentPhotoLoadingModel photo);
        public Task<IEquipmentPhotoLoadingResult> LoadFileWithThumbnailAsync(IEquipmentPhotoLoadingModel photo, IDimensionable targetDimensions);
    }
}
