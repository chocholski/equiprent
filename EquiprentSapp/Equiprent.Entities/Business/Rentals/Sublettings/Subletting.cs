using Equiprent.Entities.Business.Clients;

namespace Equiprent.Entities.Business.Rentals.Sublettings
{
    public partial class Subletting
    {
        [Key]
        public Guid Id { get; set; }

        public decimal? PricePerDay { get; set; }

        [ForeignKey(nameof(Rental))]
        public Guid RentalId { get; set; }
        public virtual SubleaseRental Rental { get; set; } = null!;

        [ForeignKey(nameof(Rentier))]
        public Guid RentierId { get; set; }
        public virtual Client Rentier { get; set; } = null!;
    }
}
