namespace Equiprent.Entities.Application
{
    public class UserRoleToLanguage : ILanguageable
    {
        [Key]
        public int Id { get; set; }

        #region ILanguageable
        [ForeignKey("Language")]
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; } = null!;

        [MaxLength(50)]
        public string Name { get; set; } = null!;
        #endregion

        [ForeignKey("UserRole")]
        [TranslatedEntity("UserRole")]
        public int UserRoleId { get; set; }
        public virtual UserRole UserRole { get; set; } = null!;
    }
}
