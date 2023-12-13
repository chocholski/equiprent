using Equiprent.Logic.Commands.Addresses.Models;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Requests.Create
{
    public class CreateRequest : ICommand
    { 
        public List<ClientAddressModel> Addresses { get; set; } = null!;
        public int TypeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Name { get; set; } = null!;
    }
}
