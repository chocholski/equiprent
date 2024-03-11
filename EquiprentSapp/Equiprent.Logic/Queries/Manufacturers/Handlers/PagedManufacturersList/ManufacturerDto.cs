namespace Equiprent.Logic.Queries.Manufacturers.Handlers.PagedManufacturersList
{
    public class ManufacturerDto
    {
        public required string AddressSummary { get; set; }

        public required Guid Id { get; set; }

        public required bool IsDeleted { get; set; }

        public required bool IsOperational { get; set; }

        public required string Name { get; set; } = null!;

        public required string NationalId { get; set; } = null!;
    }
}
