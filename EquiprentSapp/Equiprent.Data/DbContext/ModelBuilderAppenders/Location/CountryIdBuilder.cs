using System.Security.Cryptography;
using System.Text;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location
{
    internal static class CountryIdBuilder
    {
        public static Guid HashCountryRepresentationToGuidId(CountryRepresentation countryRepresentation)
        {
            var countryTextRepresentation = GetCountryTextRepresentation(countryRepresentation);
            var hashedCountryTextRepresentation = SHA1.HashData(Encoding.UTF8.GetBytes(countryTextRepresentation));
            var appropriateGuidLength = 16;
            var guidBytes = new byte[appropriateGuidLength];

            Array.Copy(hashedCountryTextRepresentation, guidBytes, length: appropriateGuidLength);

            return new Guid(guidBytes);
        }

        private static string GetCountryTextRepresentation(CountryRepresentation countryRepresentation) =>
            $"{countryRepresentation.Id}-{countryRepresentation.Code}-{countryRepresentation.Name}";
    }
}
