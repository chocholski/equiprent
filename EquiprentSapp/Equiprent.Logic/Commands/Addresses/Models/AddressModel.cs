using Equiprent.Entities.Application.Addresses;

namespace Equiprent.Logic.Commands.Addresses.Models
{
    public class AddressModel
    {
        public string? ApartmentNumber { get; set; }
        public string City { get; set; } = null!;
        public Guid CountryId { get; set; }
        public string? Email { get; set; }
        public int Id { get; set; }
        public string? PhoneNumber { get; set; }
        public string PostalCode { get; set; } = null!;
        public string StreetName { get; set; } = null!;
        public string StreetNumber { get; set; } = null!;

        public static Address CreateAddressFromModel(AddressModel model)
        {
            return new Address
            {
                ApartmentNumber = model.ApartmentNumber,
                City = model.City,
                CountryId = model.CountryId,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                PostalCode = model.PostalCode,
                StreetName = model.StreetName,
                StreetNumber = model.StreetNumber,
            };
        }
    }
}
