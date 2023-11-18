using Equiprent.Entities.Application.Countries;
using Equiprent.Entities.Application.Languages;
using Equiprent.Entities.Business.CountryToLanguages;
using System.Globalization;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location.CountryToLanguages
{
    internal sealed class CountryToENLanguageSeeder : CountryToLanguageSeeder
    {
        private readonly List<RegionInfo> _regions;

        public CountryToENLanguageSeeder(
            ModelBuilder builder,
            List<Country> countries,
            Language language,
            List<RegionInfo> regions) : base(builder, countries, language)
        {
            _regions = regions;
        }

        public override void Seed()
        {
            foreach (var country in _countries)
            {
                var countryToLanguage = new CountryToLanguage
                {
                    Id = CountryToLanguageSeederFactory.LastUsedId++,
                    Name = _regions
                        .Where(r => CountryIdBuilder.HashCountryRepresentationToGuidId(new CountryRepresentation(r.TwoLetterISORegionName, r.GeoId, r.Name)) == country.Id)
                        .Select(r => r.EnglishName)
                        .Single(),
                    CountryId = country.Id,
                    LanguageId = _language.Id
                };

                _builder.Entity<CountryToLanguage>().HasData(countryToLanguage);
            }
        }
    }
}
