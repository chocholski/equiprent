using Equiprent.Logic.Commands.Equipments.Responses.EquipmentPhotoThumbnailForFile;
using MediatR;

namespace Equiprent.Logic.Commands.Equipments.Requests.MakeEquipmentPhotoThumbnailForFile
{
    public class MakeEquipmentPhotoThumbnailForFileRequest : IRequest<EquipmentPhotoThumbnailForFileResponse?>
    {
        public required string File { get; set; }

        public required string FileName { get; set; }
    }
}
