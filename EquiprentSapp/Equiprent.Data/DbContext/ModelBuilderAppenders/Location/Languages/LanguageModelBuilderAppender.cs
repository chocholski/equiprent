using Equiprent.Entities.Application.Languages;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location
{
    public partial class LocationModelBuilderAppender
    {
        protected List<Language> _seededLanguages = new();

        private void SeedLanguages(ModelBuilder builder)
        {
            var languages = new List<Language>()
                .Append(new Language
                {
                    Code = "EN",
                    Id = 1,
                    Name = "English"
                })
                .Append(new Language
                {
                    Code = "PL",
                    Id = 2,
                    Name = "Polski"
                });

            foreach (var language in languages)
            {
                builder.Entity<Language>().HasData(language);
                _seededLanguages.Add(language);
            }
        }
    }
}
