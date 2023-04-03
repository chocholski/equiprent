using Equiprent.Entities.Interfaces;

namespace Equiprent.ApplicationServices.Languageable
{
    public interface ILanguageableService
    {
        public Task<List<LanguageableItem>> GetEntityIdsWithNamesInCurrentUserLanguageAsync<TEntity>(EntityIdsFilterModeEnum? entityIdsFilterMode = null, List<int>? translatedEntityIds = null, int? languageId = null) 
            where TEntity : class, ILanguageable;
    }

    public class LanguageableItem
    {
        public readonly int Id;
        public readonly string Name;

        public LanguageableItem(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }

    public static class ListOfLanguageableItemsExtension
    {
        public static string GetNameForId(this IEnumerable<LanguageableItem> items, int id)
        {
            return items.Where(item => item.Id == id).Select(item => item.Name).SingleOrDefault() ?? string.Empty;
        }
    }

    public enum EntityIdsFilterModeEnum
    {
        Include = 1,
        Exclude = 2
    }
}
