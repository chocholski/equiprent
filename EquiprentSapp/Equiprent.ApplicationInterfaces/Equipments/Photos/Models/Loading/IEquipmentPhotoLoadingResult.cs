using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading.Thumbnails;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;

namespace Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading
{
    public interface IEquipmentPhotoLoadingResult
    {
        public byte[]? File { get; }

        public IFileArchiveLoadingResult? FileArchiveLoadingResult { get; set; }

        public IFileLoadingResult? FileLoadingResult { get; set; }

        public string FileName { get; }

        public string FilePath { get; }

        public EquipmentPhotoLoadingResultEnum Status { get; set; }

        public IEquipmentPhotoThumbnailLoadingResult ThumbnailLoadingResult { get; set; }
    }
}
