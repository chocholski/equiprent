using Equiprent.ApplicationInterfaces.Abstractions;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Saving;
using SkiaSharp;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos
{
    public interface IEquipmentPhotoService
    {
        public static readonly string EquipmentPhotosFolderPath = @"Uploaded\Equipment\Photos";

        public string? GetEncodedImage(SKBitmap image, string fileName);
        public Task<IEquipmentPhotoLoadingResult> LoadFileWithoutThumbnailAsync(IEquipmentPhotoLoadingModel photo);
        public Task<IEquipmentPhotoLoadingResult> LoadFileWithThumbnailAsync(IEquipmentPhotoLoadingModel photo, IDimensionable targetDimensions);
        public SKBitmap? MakeThumbnailFromEncodedFile(string encodedFile);
        public Task<IEquipmentPhotoSavingResult> SaveEncodedFileAsync(IEquipmentPhotoSavingModel photo);
    }
}
