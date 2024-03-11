namespace Equiprent.Logic.Queries.Clients.Handlers.PagedClientRepresentativesList
{
    public class ClientRepresentativeDto
    {
        public required string Email { get; set; }

        public required string FirstName { get; set; }

        public required Guid Id { get; set; }

        public required string LastName { get; set; }

        public required string PhoneNumber { get; set; }
    }
}
