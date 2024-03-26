namespace Equiprent.Data.CustomQueryTypes.Rentals
{
    public class RentalListQueryModel
    {
        public required int CategoryId { get; set; }

        public required DateTime End { get; set; }

        public required Guid Id { get; set; }

        public required string Number { get; set; }

        public required Guid RenterId { get; set; }

        public string RenterName { get; set; } = null!;

        public required Guid RentierId { get; set; }

        public string RentierName { get; set; } = null!;

        public required DateTime Start { get; set; }

        public Guid? UserResponsibleForHandlingId { get; set; }

        public string? UserResponsibleForHandlingFirstName { get; set; }

        public string? UserResponsibleForHandlingLastName { get; set; }
    }
}
