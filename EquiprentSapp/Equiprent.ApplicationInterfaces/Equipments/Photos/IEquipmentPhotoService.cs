using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos
{
    public interface IEquipmentPhotoService
    {
        public static readonly string EquipmentPhotosFolderPath = @"Uploaded\Equipment\Photos";

        public Task<IEquipmentPhotoLoadingResult> LoadFileAsync(string photoRelativePath, string photoFileName);
    }
}
