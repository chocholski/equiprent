using Equiprent.Entities.Application.Countries;
using Equiprent.Entities.Application.Languages;
using Equiprent.Entities.Business.CountryToLanguages;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location.CountryToLanguages
{
    internal sealed class CountryToPLLanguageSeeder : CountryToLanguageSeeder
    {
        public CountryToPLLanguageSeeder(
            ModelBuilder builder,
            List<Country> countries,
            Language language) : base(builder, countries, language) { }

        public override void Seed()
        {
            foreach (var country in _countries)
            {
                if (country.Code == "GB")
                {
                    _builder.Entity<CountryToLanguage>().HasData(new CountryToLanguage
                    {
                        Id = CountryToLanguageSeederFactory.LastUsedSeedId++,
                        Name = "Wielka Brytania",
                        CountryId = country.Id,
                        LanguageId = _language.Id
                    });
                }
                else if (country.Code == "PL")
                {
                    _builder.Entity<CountryToLanguage>().HasData(new CountryToLanguage
                    {
                        Id = CountryToLanguageSeederFactory.LastUsedSeedId++,
                        Name = "Polska",
                        CountryId = country.Id,
                        LanguageId = _language.Id
                    });
                }
                else if (country.Code == "US")
                {
                    _builder.Entity<CountryToLanguage>().HasData(new CountryToLanguage
                    {
                        Id = CountryToLanguageSeederFactory.LastUsedSeedId++,
                        Name = "Stany Zjednoczone",
                        CountryId = country.Id,
                        LanguageId = _language.Id
                    });
                }
            }
        }
    }
}
