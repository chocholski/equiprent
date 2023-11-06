namespace Equiprent.Entities.Business.RentalCategoryToLanguage
{
    public partial class RentalCategoryToLanguage : ILanguageable
    {
        [ForeignKey("Language")]
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; } = null!;
    }
}
