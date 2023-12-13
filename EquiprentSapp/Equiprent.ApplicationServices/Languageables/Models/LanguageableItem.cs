namespace Equiprent.ApplicationServices.Languageables.Models
{
    public record LanguageableItem
    {
        public readonly string Id;
        public readonly string Name;

        public LanguageableItem(string id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
