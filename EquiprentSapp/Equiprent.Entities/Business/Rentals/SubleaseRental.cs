using Equiprent.Entities.Business.Rentals.Sublettings;

namespace Equiprent.Entities.Business.Rentals
{
    [Table("SubleaseRentals")]
    public class SubleaseRental : Rental
    {
        [InverseProperty(nameof(Subletting.Rental))]
        public virtual List<Subletting> Sublettings { get; set; } = null!;
    }
}
