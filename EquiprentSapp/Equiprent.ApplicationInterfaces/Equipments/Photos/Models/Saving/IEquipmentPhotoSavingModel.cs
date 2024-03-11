namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Saving
{
    public interface IEquipmentPhotoSavingModel : IEquipmentPhotoModel
    {
        public string EncodedFile { get; set; }
    }
}
