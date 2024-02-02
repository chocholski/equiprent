using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Manufacturers.Responses.PagedManufacturersList
{
    public class ManufacturerListItemViewModel
    {
        public string AddressSummary { get; set; } = null!;

        public Guid Id { get; set; }

        public bool IsOperational { get; set; }

        [SortColumn]
        public string Name { get; set; } = null!;

        public string NationalId { get; set; } = null!;
    }
}
