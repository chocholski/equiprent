using Equiprent.Entities.Interfaces;

namespace Equiprent.Logic.Queries.Rentals.Responses.RentalEventsList
{
    public class RentalAsEventDto : IPeriodable
    {
        public required DateTime End { get; set; }

        public required Guid Id { get; set; }

        public required DateTime Start { get; set; }
    }
}
