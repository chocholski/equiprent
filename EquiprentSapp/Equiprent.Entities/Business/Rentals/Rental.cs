using Equiprent.Entities.Application.Users;

namespace Equiprent.Entities.Business.Rentals
{
    public partial class Rental
    {
        public DateTime? ExpectedStart { get; set; }

        [Key]
        public Guid Id { get; set; }

        public bool IsComingFromExternalSource { get; set; }

        public string Number { get; set; } = null!;

        public DateTime? Start { get; set; }

        [ForeignKey(nameof(UserResponsibleForHandling))]
        public Guid? UserResponsibleForHandlingId { get; set; }
        public virtual User? UserResponsibleForHandling { get; set; }
    }
}
