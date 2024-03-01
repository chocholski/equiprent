using Equiprent.Entities.Application.Languages;

namespace Equiprent.Entities.Business.ClientTypeToLanguages
{
    public partial class ClientTypeToLanguage : ILanguageable
    {
        [ForeignKey(nameof(Language))]
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; } = null!;
    }
}
