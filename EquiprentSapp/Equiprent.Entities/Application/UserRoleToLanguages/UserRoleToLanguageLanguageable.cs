using Equiprent.Entities.Application.Languages;

namespace Equiprent.Entities.Application.UserRoleToLanguages
{
    public partial class UserRoleToLanguage : ILanguageable
    {
        [ForeignKey(nameof(Language))]
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; } = null!;
    }
}
