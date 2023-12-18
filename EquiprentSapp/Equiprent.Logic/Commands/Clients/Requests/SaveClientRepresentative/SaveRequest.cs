using Equiprent.Logic.Commands.Addresses.Models;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Requests.SaveClientRepresentative
{
    public class SaveRequest : ICommand
    {
        public AddressModel Address { get; set; } = null!;
        public Guid ClientId { get; set; }
        public string FirstName { get; set; } = null!;
        public Guid Id { get; set; }
        public string LastName { get; set; } = null!;
    }
}
