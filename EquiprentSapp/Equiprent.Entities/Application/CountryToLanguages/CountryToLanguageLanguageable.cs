using Equiprent.Entities.Application.Languages;

namespace Equiprent.Entities.Business.CountryToLanguages
{
    public partial class CountryToLanguage : ILanguageable
    {
        [ForeignKey(nameof(Language))]
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; } = null!;
    }
}
