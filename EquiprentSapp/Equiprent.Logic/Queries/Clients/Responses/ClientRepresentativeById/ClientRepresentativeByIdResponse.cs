using Equiprent.Logic.GeneralModels;

namespace Equiprent.Logic.Queries.Clients.Responses.ClientRepresentativeById
{
    public class ClientRepresentativeByIdResponse
    {
        public required AddressModel Address { get; set; }
        public required Guid ClientId { get; set; }
        public required string FirstName { get; set; }
        public required Guid Id { get; set; }
        public required string LastName { get; set; }
    }
}
