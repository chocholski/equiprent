
namespace Equiprent.Entities.Business.Rentals.Sublettings
{
    public partial class Subletting : IPeriodable
    {
        public required DateTime Start { get; set; }

        public required DateTime End { get; set; }
    }
}
