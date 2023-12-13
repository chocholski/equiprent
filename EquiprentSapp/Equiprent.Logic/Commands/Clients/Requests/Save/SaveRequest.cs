using Equiprent.Logic.Commands.Addresses.Models;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Requests.Save
{
    public class SaveRequest : ICommand
    {
        public List<ClientAddressModel> Addresses { get; set; } = new();
        public string? FirstName { get; set; }
        public Guid Id { get; set; }
        public string? LastName { get; set; }
        public string Name { get; set; } = null!;
        public int TypeId { get; set; }
    }
}
