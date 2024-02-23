namespace Equiprent.Logic.Queries.Manufacturers.Handlers.PagedManufacturersList
{
    public class ManufacturerDto
    {
        public string AddressSummary { get; set; } = null!;

        public Guid Id { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsOperational { get; set; }

        public string Name { get; set; } = null!;

        public string NationalId { get; set; } = null!;
    }
}
