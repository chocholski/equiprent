using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Commands.Equipments.Photos.Responses.UploadMultiple;
using MediatR;

namespace Equiprent.Logic.Commands.Equipments.Photos.Requests.UploadMultiple
{
    public class UploadMultipleRequest : IRequest<UploadMultipleResponse?>
    {
        public required Guid EquipmentId { get; set; }

        public required List<EquipmentPhotoBase> Photos { get; set; }
    }
}
