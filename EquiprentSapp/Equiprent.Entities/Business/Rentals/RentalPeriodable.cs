namespace Equiprent.Entities.Business.Rentals
{
    public partial class Rental : IPeriodable
    {
        public required DateTime Start { get; set; }
        public required DateTime End { get; set; }
    }
}
