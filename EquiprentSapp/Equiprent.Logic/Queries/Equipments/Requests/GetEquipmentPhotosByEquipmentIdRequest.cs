using Equiprent.Logic.Queries.Equipments.Responses.EquipmentPhotosByEquipmentId;
using MediatR;

namespace Equiprent.Logic.Queries.Equipments.Requests
{
    public class GetEquipmentPhotosByEquipmentIdRequest : IRequest<EquipmentPhotosByEquipmentIdResponse?>
    {
        public Guid EquipmentId { get; set; }

        public GetEquipmentPhotosByEquipmentIdRequest(Guid equipmentId) => EquipmentId = equipmentId;
    }
}
