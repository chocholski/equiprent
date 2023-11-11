using Equiprent.Entities.Application.Languages;

namespace Equiprent.Entities.Business.RentalCategoryToLanguages
{
    public partial class RentalCategoryToLanguage : ILanguageable
    {
        [ForeignKey(nameof(Language))]
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; } = null!;
    }
}
