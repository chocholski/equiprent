using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;

namespace Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading
{
    public record EquipmentPhotoLoadingModel : IEquipmentPhotoLoadingModel
    {
        public required string FileNameWithExtension { get; set; }
        public required string Path { get; set; }
    }
}
