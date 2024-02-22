using Equiprent.Logic.Queries.Equipments.Responses.EquipmentById;
using MediatR;

namespace Equiprent.Logic.Queries.Equipments.Requests
{
    public class GetEquipmentByIdRequest : IRequest<EquipmentByIdResponse?>
    {
        public Guid Id { get; set; }

        public GetEquipmentByIdRequest(Guid equipmentId) => Id = equipmentId;
    }
}
