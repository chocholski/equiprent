namespace Equiprent.Entities.Business.Rentals
{
    public partial class Rental : IPeriodable
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
