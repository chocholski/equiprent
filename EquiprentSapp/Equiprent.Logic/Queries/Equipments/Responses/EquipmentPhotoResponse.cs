using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Queries.Equipments.Responses
{
    public class EquipmentPhotoResponse : FileResponse
    {
        public required Guid Id { get; set; }

        public required bool IsMainThumbnail { get; set; }
    }
}
