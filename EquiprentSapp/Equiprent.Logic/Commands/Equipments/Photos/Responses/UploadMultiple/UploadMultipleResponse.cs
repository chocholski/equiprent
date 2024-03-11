using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.Equipments.Photos.Responses.UploadMultiple
{
    public class UploadMultipleResponse
    {
        public List<EquipmentPhotoBase> UploadedPhotos { get; set; } = new();
    }
}
