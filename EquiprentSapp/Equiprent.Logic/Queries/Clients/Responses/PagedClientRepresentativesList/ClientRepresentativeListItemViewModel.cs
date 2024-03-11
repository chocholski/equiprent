using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientRepresentativesList
{
    public class ClientRepresentativeListItemViewModel
    {
        public required string Email { get; set; }

        public required string FirstName { get; set; }

        public required Guid Id { get; set; }

        [SortColumn]
        public required string LastName { get; set; }

        public required string PhoneNumber { get; set; }
    }
}
