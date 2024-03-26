using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Rentals.Responses.PagedRentalsList
{
    public class RentalListItemViewModel
    {
        public required int CategoryId { get; set; }

        public string CategoryName { get; set; } = null!;

        public required DateTime End { get; set; }

        public required Guid Id { get; set; }

        [SortColumn]
        public required string Number { get; set; }

        public required Guid RenterId { get; set; }

        public string RenterName { get; set; } = null!;

        public required Guid RentierId { get; set; }

        public string RentierName { get; set; } = null!;

        public required DateTime Start { get; set; }

        public Guid? UserResponsibleForHandlingId { get; set; }

        public string? UserResponsibleForHandlingName { get; set; }
    }
}
