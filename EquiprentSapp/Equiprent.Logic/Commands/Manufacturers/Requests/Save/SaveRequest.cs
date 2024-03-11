using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Logic.GeneralModels;
using MediatR;

namespace Equiprent.Logic.Commands.Manufacturers.Requests.Save
{
    public record SaveRequest : IRequest<CommandResult>
    {
        public required ManufacturerAddressModel Address { get; set; }
        public required Guid Id { get; set; }
        public required bool IsOperational { get; set; }
        public required string Name { get; set; }
    }
}
