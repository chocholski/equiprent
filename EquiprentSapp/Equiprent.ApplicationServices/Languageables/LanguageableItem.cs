namespace Equiprent.ApplicationServices.Languageables
{
    public record LanguageableItem
    {
        public readonly int Id;
        public readonly string Name;

        public LanguageableItem(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
