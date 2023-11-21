using Equiprent.Data.DbContext.ModelBuilderAppenders.Location.CountryToLanguages.CountryToLanguageSeeders;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location
{
    public partial class LocationModelBuilderAppender
    { 
        private void SeedCountryToLanguages(ModelBuilder builder)
        {
            foreach (var language in _seededLanguages)
            {
                CountryToLanguageSeederFactory
                    .MakeSeeder(builder, _seededCountries, language, _regions)?
                    .Seed();
            }
        }
    }
}
