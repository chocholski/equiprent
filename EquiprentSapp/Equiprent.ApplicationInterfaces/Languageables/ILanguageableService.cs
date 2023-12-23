using Equiprent.ApplicationInterfaces.Languageables.Models;
using Equiprent.Entities.Interfaces;

namespace Equiprent.ApplicationInterfaces.Languageables
{
    public interface ILanguageableService
    {
        public Task TranslateListLanguageableValuesAsync<T, U>(List<T> list,
            string idPropertyName,
            string namePropertyName,
            EntityIdsFilterModeEnum? entityIdsFilterMode = null,
            List<string>? translatedEntityIds = null,
            int? languageId = null)
                where T : class
                where U : class, ILanguageable;

        public Task<List<ILanguageableItem>> GetEntityIdsWithNamesInCurrentUserLanguageAsync<TEntity>(
            EntityIdsFilterModeEnum? entityIdsFilterMode = null,
            int? languageId = null,
            params string[] translatedEntityIds) where TEntity : class, ILanguageable;
    }

    public static class Extension
    {
        public static string GetNameForId(this IEnumerable<ILanguageableItem> items, string id) =>
            items
                .Where(item => item.Id == id)
                .Select(item => item.Name)
                .SingleOrDefault()
                ??
                string.Empty;
    }
}
