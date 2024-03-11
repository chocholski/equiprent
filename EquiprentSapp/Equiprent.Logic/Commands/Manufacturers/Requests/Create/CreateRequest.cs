using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Logic.GeneralModels;
using MediatR;

namespace Equiprent.Logic.Commands.Manufacturers.Requests.Create
{
    public partial class CreateRequest : IRequest<CommandResult?>
    {
        public required ManufacturerAddressModel Address { get; set; }
        public required bool IsOperational { get; set; }
        public required string Name { get; set; }
    }
}
