namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Saving
{
    public interface IEquipmentPhotoSavingResult
    { 
        public string FileNameWithExtension { get; }

        public string FileNameWithoutExtension { get; }

        public string NormalizedFileNameWithoutExtension { get; }

        public string RelativePath { get; }

        public EquipmentPhotoSavingResultEnum Status { get; set; }
    }
}
