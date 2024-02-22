using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Equipments.Requests.Create
{
    public class CreateRequest : IRequest<CommandResult>
    {
        public string? Description { get; set; }

        public Guid ManufacturerId { get; set; }

        public decimal MarketValue { get; set; }

        public string Name { get; set; } = null!;

        public decimal PricePerDay { get; set; }

        public string SerialNumber { get; set; } = null!;

        public int TypeId { get; set; }
    }
}
