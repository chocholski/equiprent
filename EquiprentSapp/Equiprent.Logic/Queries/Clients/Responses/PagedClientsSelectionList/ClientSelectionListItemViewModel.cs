using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList
{
    public class ClientSelectionListItemViewModel
    {
        public string? FirstName { get; set; }

        public required Guid Id { get; set; }

        public string? LastName { get; set; }

        [SortColumn]
        public string? Name { get; set; }

        public string? NationalId { get; set; }

        public required int TypeId { get; set; }

        public string? TypeName { get; set; }
    }
}
