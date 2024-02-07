using Equiprent.Entities.Application.Addresses;

namespace Equiprent.Logic.GeneralModels
{
    public class AddressModel
    {
        public string? ApartmentNumber { get; set; }
        public string City { get; set; } = null!;
        public CountryModel Country { get; set; } = new();
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
                CountryId = model.Country.Id,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                PostalCode = model.PostalCode,
                StreetName = model.StreetName,
                StreetNumber = model.StreetNumber,
            };
        }

        public string GetSummary()
        {
            var summaryBuilder = new StringBuilder()
                .Append($"{StreetName} {StreetNumber}")
                .Append(!string.IsNullOrEmpty(ApartmentNumber) ? $"/{ApartmentNumber}" : string.Empty)
                .Append($", {PostalCode}")
                .Append($", {City}")
                .Append(!string.IsNullOrEmpty(Country.Code) ? $", {Country.Code}" : string.Empty);

            return summaryBuilder.ToString();
        }
    }
}
