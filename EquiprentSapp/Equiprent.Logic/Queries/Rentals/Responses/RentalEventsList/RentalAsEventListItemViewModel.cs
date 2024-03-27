using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Rentals.Responses.RentalEventsList
{
    public class RentalAsEventListItemViewModel
    {
        public required DateTime End { get; set; }

        public required Guid Id { get; set; }

        [SortColumn]
        public required DateTime Start { get; set; }
    }
}
