using Equiprent.Logic.Commands.Addresses.Models;

namespace Equiprent.Logic.Queries.Clients.Responses.ClientRepresentativeById
{
    public class ClientRepresentativeByIdResponse
    {
        public AddressModel Address { get; set; } = null!;
        public Guid ClientId { get; set; }
        public string FirstName { get; set; } = null!;
        public Guid Id { get; set; }
        public string LastName { get; set; } = null!;
    }
}
