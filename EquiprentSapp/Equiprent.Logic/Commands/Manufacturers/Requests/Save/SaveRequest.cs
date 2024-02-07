using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Logic.GeneralModels;
using MediatR;

namespace Equiprent.Logic.Commands.Manufacturers.Requests.Save
{
    public record SaveRequest : IRequest<CommandResult>
    {
        public ManufacturerAddressModel Address { get; set; } = null!;
        public Guid Id { get; set; }
        public bool IsOperational { get; set; }
        public string Name { get; set; } = null!;
    }
}
