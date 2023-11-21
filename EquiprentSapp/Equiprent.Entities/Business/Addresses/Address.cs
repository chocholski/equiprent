using Equiprent.Entities.Application.Countries;

namespace Equiprent.Entities.Business.Addresses
{
    public partial class Address
    {
        [MaxLength(25)]
        public string? ApartmentNumber { get; set; } = null!;

        [ForeignKey(nameof(Country))]
        public Guid CountryId { get; set; }
        public virtual Country Country { get; set; } = null!;

        public string? Email { get; set; }

        [Key]
        public int Id { get; set; }

        public string? PhoneNumber { get; set; } = null!;

        public string StreetName { get; set; } = null!;

        [MaxLength(50)]
        public string StreetNumber { get; set; } = null!;
    }
}
