using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Equipments.Requests.Save
{
    public class SaveRequest : IRequest<CommandResult>
    {
        public string? Description { get; set; }

        public required Guid Id { get; set; }

        public required Guid ManufacturerId { get; set; }

        public required decimal MarketValue { get; set; }

        public required string Name { get; set; }

        public required decimal PricePerDay { get; set; }

        public required string SerialNumber { get; set; }

        public required int TypeId { get; set; }
    }
}
