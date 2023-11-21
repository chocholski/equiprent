namespace Equiprent.Logic.Commands.Addresses.Models
{
    public class AddressModel
    {
        public string? ApartmentNumber { get; set; }
        public Guid CountryId { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string StreetName { get; set; } = null!;
        public string StreetNumber { get; set; } = null!;
    }
}
