using Equiprent.Entities.Application.Countries;

namespace Equiprent.Entities.Application.Addresses
{
    public partial class Address
    {
        [MaxLength(25)]
        public required string? ApartmentNumber { get; set; }

        [MaxLength(200)]
        public required string City { get; set; }

        [ForeignKey(nameof(Country))]
        public Guid CountryId { get; set; }
        public virtual Country Country { get; set; } = null!;

        public string? Email { get; set; }

        [Key]
        public int Id { get; set; }

        public string? PhoneNumber { get; set; }

        [MaxLength(8)]
        public required string PostalCode { get; set; }

        public required string StreetName { get; set; }

        [MaxLength(50)]
        public required string StreetNumber { get; set; }
    }
}
