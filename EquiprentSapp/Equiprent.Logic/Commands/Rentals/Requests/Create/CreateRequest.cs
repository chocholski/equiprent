using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Rentals.Requests.Create
{
    public partial record CreateRequest : IRequest<CommandResult>
    {
        public required int CategoryId { get; set; }

        public required DateTime End { get; set; }

        public required Guid EquipmentId { get; set; }

        public required Guid RenterId { get; set; }

        public required Guid RentierId { get; set; }

        public required DateTime Start { get; set; }

        public Guid? UserResponsibleForHandlingId { get; set; }
    }
}
