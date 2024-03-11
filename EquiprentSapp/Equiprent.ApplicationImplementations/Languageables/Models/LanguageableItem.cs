using Equiprent.ApplicationInterfaces.Languageables.Models;

namespace Equiprent.ApplicationImplementations.Languageables.Models
{
    public record LanguageableItem : ILanguageableItem
    {
        public string Id { get; init; }
        public string Name { get; init; }

        public LanguageableItem(string id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
