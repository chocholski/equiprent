namespace Equiprent.Entities.Application
{
    public partial class UserRoleToLanguage : ILanguageable
    {
        [ForeignKey("Language")]
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; } = null!;
    }
}
