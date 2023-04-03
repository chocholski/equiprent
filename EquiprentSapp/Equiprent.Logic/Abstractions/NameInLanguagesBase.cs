namespace Equiprent.Logic.Abstractions
{
    public abstract class NameInLanguagesBase
    {
        public List<NameInLanguage> NameInLanguages { get; set; }

        public NameInLanguagesBase()
        {
            NameInLanguages = new List<NameInLanguage>();
        }
    }

    public class NameInLanguage
    {
        public string Name { get; set; } = null!;
        public int LaguageId { get; set; }
        public string? LaguageName { get; set; }
    }
}
