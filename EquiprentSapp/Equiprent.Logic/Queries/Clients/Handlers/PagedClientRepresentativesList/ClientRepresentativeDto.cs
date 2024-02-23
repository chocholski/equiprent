namespace Equiprent.Logic.Queries.Clients.Handlers.PagedClientRepresentativesList
{
    public class ClientRepresentativeDto
    {
        public string Email { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public Guid Id { get; set; }

        public string LastName { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;
    }
}
