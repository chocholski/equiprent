namespace Equiprent.Logic.Abstractions
{
    public abstract record NameInLanguagesBaseResponse
    {
        public List<NameInLanguage> NameInLanguages { get; set; } = new List<NameInLanguage>();
    }

    public record NameInLanguage(string Name, int LanguageId, string? LanguageName);
}
