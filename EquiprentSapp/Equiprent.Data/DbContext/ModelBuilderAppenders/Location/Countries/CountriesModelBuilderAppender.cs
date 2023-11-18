using Equiprent.Entities.Application.Countries;
using System.Globalization;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location
{
    public partial class LocationModelBuilderAppender
    {
        protected List<RegionInfo> _regions = new();
        protected List<Country> _seededCountries = new();

        private void SeedCountries(ModelBuilder builder)
        {
            _regions.AddRange(CultureInfo
                .GetCultures(CultureTypes.SpecificCultures)
                .Select(GetRegionForCulture)
                .OrderBy(r => r.GeoId)
                .Distinct()
                .ToList());

            foreach (var region in _regions)
            {
                var country = GetCountryForRegion(region);

                builder.Entity<Country>().HasData(country);
                _seededCountries.Add(country);
            }
        }

        private static Country GetCountryForRegion(RegionInfo region)
        {
            return new Country
            {
                Id = CountryIdBuilder.HashCountryRepresentationToGuidId(
                    new CountryRepresentation(region.TwoLetterISORegionName, region.GeoId, region.Name)),
                Code = region.TwoLetterISORegionName
            };
        }

        private static RegionInfo GetRegionForCulture(CultureInfo culture) => new(culture.Name);
    }
}
