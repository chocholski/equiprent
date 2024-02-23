using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Logic.GeneralModels;
using MediatR;

namespace Equiprent.Logic.Commands.Manufacturers.Requests.Create
{
    public partial class CreateRequest : IRequest<CommandResult?>
    {
        public ManufacturerAddressModel Address { get; set; } = null!;
        public bool IsOperational { get; set; }
        public string Name { get; set; } = null!;
    }
}
