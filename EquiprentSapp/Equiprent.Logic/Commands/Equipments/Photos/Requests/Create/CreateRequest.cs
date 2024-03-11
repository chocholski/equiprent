using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Logic.Abstractions;
using MediatR;

namespace Equiprent.Logic.Commands.Equipments.Photos.Requests.Create
{
    public sealed record CreateRequest : IRequest<CommandResult>, ICreatorContainable
    {
        public Guid CreatedById { get; set; }

        public required Guid EquipmentId { get; set; }

        public required string FileName { get; set; }

        public bool IsMainThumbnail { get; set; }

        public required string RelativePath { get; set; }
    }
}
