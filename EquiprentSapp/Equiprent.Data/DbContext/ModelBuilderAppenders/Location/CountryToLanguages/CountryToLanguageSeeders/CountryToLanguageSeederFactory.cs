using Equiprent.Data.DbContext.ModelBuilderAppenders.Location.CountryToLanguages.CountryToLanguageSeeders.Seeders;
using Equiprent.Entities.Application.Countries;
using Equiprent.Entities.Application.Languages;
using System.Globalization;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location.CountryToLanguages.CountryToLanguageSeeders
{
    internal static class CountryToLanguageSeederFactory
    {
        internal static int LastUsedSeedId { get; set; } = 1;

        public static CountryToLanguageSeeder? MakeSeeder(ModelBuilder builder, List<Country> countries, Language language, List<RegionInfo> regions)
        {
            CountryToLanguageSeeder? seeder = language.Code switch
            {
                "EN" => new CountryToENLanguageSeeder(builder, countries, language, regions),
                "PL" => new CountryToPLLanguageSeeder(builder, countries, language),
                _ => null
            };

            return seeder;
        }
    }
}
