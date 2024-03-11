using Equiprent.ApplicationInterfaces.Equipments.Photos.Models;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Saving;
using Equiprent.ApplicationInterfaces.Files;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Equipments.Photos.Models.Saving
{
    public record EquipmentPhotoSavingResult : EquipmentPhotoResultBase, IEquipmentPhotoSavingResult
    {
        public string FilePath { get => Path.Combine(DefaultPath, FileNameWithExtension); }

        public string RelativePath { get; set; }

        public EquipmentPhotoSavingResultEnum Status { get; set; } = EquipmentPhotoSavingResultEnum.Unknown;

        public EquipmentPhotoSavingResult(
            IConfiguration configuration,
            IFileService fileService,
            IEquipmentPhotoSavingModel photo) : base(configuration, fileService, photo)
        {
        }
    }
}
