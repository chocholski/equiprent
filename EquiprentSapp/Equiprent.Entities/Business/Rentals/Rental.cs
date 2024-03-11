using Equiprent.Entities.Application.Users;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.RentalCategories;

namespace Equiprent.Entities.Business.Rentals
{
    public abstract partial class Rental
    {
        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }
        public virtual RentalCategory Category { get; set; } = null!;

        [Key]
        public Guid Id { get; set; }

        public required string Number { get; set; }

        [ForeignKey(nameof(Renter))]
        public Guid RenterId { get; set; }
        public virtual Client Renter { get; set; } = null!;

        [ForeignKey(nameof(Rentier))]
        public Guid RentierId { get; set; }
        public virtual Client Rentier { get; set; } = null!;

        [ForeignKey(nameof(UserResponsibleForHandling))]
        public Guid? UserResponsibleForHandlingId { get; set; }
        public virtual User? UserResponsibleForHandling { get; set; }
    }
}
