using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Manufacturers.Responses.PagedManufacturersList
{
    public class ManufacturerListItemViewModel
    {
        public required string AddressSummary { get; set; }

        public required Guid Id { get; set; }

        public required bool IsDeleted { get; set; }

        public required bool IsOperational { get; set; }

        [SortColumn]
        public required string Name { get; set; }

        public required string NationalId { get; set; }
    }
}
