using Equiprent.Logic.Queries.Equipments.Responses.EquipmentPhotoById;
using MediatR;

namespace Equiprent.Logic.Queries.Equipments.Requests
{
    public class GetEquipmentPhotoByIdRequest : IRequest<EquipmentPhotoByIdReponse?>
    {
        public Guid PhotoId { get; set; }

        public GetEquipmentPhotoByIdRequest(Guid photoId) => PhotoId = photoId;
    }
}
