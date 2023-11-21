using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientsList
{
    public class ClientListItemViewModel
    {
        public string? FirstName { get; set; }

        public Guid Id { get; set; }

        public string? LastName { get; set; }

        [SortColumn]
        public string? Name { get; set; } = null!;

        public string? NationalId { get; set; } = null!;

        public int TypeId { get; set; }

        public string TypeName { get; set; } = null!;
    }
}
