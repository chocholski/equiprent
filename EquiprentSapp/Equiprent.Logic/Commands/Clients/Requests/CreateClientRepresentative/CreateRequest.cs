using Equiprent.Logic.Commands.Addresses.Models;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Requests.CreateClientRepresentative
{
    public class CreateRequest : ICommand
    {
        public AddressModel Address { get; set; } = null!;
        public Guid? ClientId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
    }
}
