using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Logic.Commands.Addresses.Models;
using MediatR;

namespace Equiprent.Logic.Commands.Clients.Requests.CreateClientRepresentative
{
    public class CreateRequest : IRequest<CommandResult?>
    {
        public AddressModel Address { get; set; } = null!;
        public Guid? ClientId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
    }
}
