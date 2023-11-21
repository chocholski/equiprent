using Equiprent.Entities.Application.Countries;
using Equiprent.Entities.Application.Languages;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location.CountryToLanguages.CountryToLanguageSeeders
{
    internal abstract class CountryToLanguageSeeder
    {
        protected readonly ModelBuilder _builder;
        protected readonly List<Country> _countries;
        protected readonly Language _language;

        public CountryToLanguageSeeder(
            ModelBuilder builder,
            List<Country> countries,
            Language language)
        {
            _builder = builder;
            _countries = countries;
            _language = language;
        }

        public abstract void Seed();
    }
}
