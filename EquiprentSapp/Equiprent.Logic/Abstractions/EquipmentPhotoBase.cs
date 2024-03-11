namespace Equiprent.Logic.Abstractions
{
    public class EquipmentPhotoBase : FileBase
    {
        public required Guid Id { get; set; }

        public required bool IsMainThumbnail { get; set; }

        public string? ThumbnailFile { get; set; }
    }
}
