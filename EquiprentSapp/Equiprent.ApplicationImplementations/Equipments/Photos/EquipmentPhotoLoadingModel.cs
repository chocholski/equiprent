using Equiprent.ApplicationInterfaces.Equipments.Photos.Models;

namespace Equiprent.ApplicationImplementations.Equipments.Photos
{
    public record EquipmentPhotoLoadingModel : IEquipmentPhotoLoadingModel
    {
        public required string FileName { get; set; }
        public required string RelativePath { get; set; }
    }
}
