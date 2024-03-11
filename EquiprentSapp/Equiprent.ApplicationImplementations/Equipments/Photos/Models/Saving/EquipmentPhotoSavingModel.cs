using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Saving;

namespace Equiprent.ApplicationImplementations.Equipments.Photos.Models.Saving
{
    public class EquipmentPhotoSavingModel : IEquipmentPhotoSavingModel
    {
        public required string EncodedFile { get; set; }

        public required string FileNameWithExtension { get; set; }

        public required string Path { get; set; }
    }
}
