namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models
{
    public interface IEquipmentPhotoModel
    {
        public string FileNameWithExtension { get; set; }

        public string Path { get; set; }
    }
}
