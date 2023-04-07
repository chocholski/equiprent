using Equiprent.Entities.Interfaces;

namespace Equiprent.ApplicationServices.Languageable
{
    public interface ILanguageableService
    {
        public Task TranslateLanguageableValuesAsync<T, U>(List<T> list,
            string idPropertyName,
            string namePropertyName,
            EntityIdsFilterModeEnum? entityIdsFilterMode = null,
            List<int>? translatedEntityIds = null,
            int? languageId = null) where U : class, ILanguageable;

        public Task<List<LanguageableItem>> GetEntityIdsWithNamesInCurrentUserLanguageAsync<TEntity>(EntityIdsFilterModeEnum? entityIdsFilterMode = null,
            List<int>? translatedEntityIds = null,
            int? languageId = null)
            where TEntity : class, ILanguageable;
    }

    public static class Extension
    {
        public static string GetNameForId(this IEnumerable<LanguageableItem> items, int id)
        {
            return items.Where(item => item.Id == id).Select(item => item.Name).SingleOrDefault() ?? string.Empty;
        }
    }
}
