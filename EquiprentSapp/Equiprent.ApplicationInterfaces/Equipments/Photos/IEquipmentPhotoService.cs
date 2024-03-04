using Equiprent.ApplicationInterfaces.Abstractions;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using System.Drawing;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos
{
    public interface IEquipmentPhotoService
    {
        public static readonly string EquipmentPhotosFolderPath = @"Uploaded\Equipment\Photos";

        public string? GetEncodedImage(Image image, string fileName);
        public Task<IEquipmentPhotoLoadingResult> LoadFileWithoutThumbnailAsync(IEquipmentPhotoLoadingModel photo);
        public Task<IEquipmentPhotoLoadingResult> LoadFileWithThumbnailAsync(IEquipmentPhotoLoadingModel photo, IDimensionable targetDimensions);
        public Image? MakeThumbnailFromEncodedFile(string encodedFile);
    }
}
