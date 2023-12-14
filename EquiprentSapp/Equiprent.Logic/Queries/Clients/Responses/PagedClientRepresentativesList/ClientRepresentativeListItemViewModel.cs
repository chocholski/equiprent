using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientRepresentativesList
{
    public class ClientRepresentativeListItemViewModel
    {
        public string Email { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public Guid Id { get; set; }

        [SortColumn]
        public string LastName { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;
    }
}
