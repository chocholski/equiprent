namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading
{
    public interface IEquipmentPhotoLoadingResult
    {
        public byte[]? File { get; set; }

        public string FileName { get; }

        public string FilePath { get; }

        public EquipmentPhotoLoadingResultEnum Status { get; set; }
    }
}
