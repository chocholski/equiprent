using Equiprent.ApplicationImplementations.Languageables.Models;
using Equiprent.ApplicationInterfaces.Languageables.Models;
using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Interfaces;
using Equiprent.ApplicationInterfaces.Users.Languages;

namespace Equiprent.ApplicationImplementations.Languageables
{
    public class LanguageableService : ILanguageableService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserLanguageService _userLanguageService;

        public LanguageableService(
            ApplicationDbContext dbContext,
            IUserLanguageService userLanguageService)
        {
            _dbContext = dbContext;
            _userLanguageService = userLanguageService;
        }

        public async Task TranslateListLanguageableValuesAsync<T, U>(List<T> list,
            string idPropertyName,
            string namePropertyName,
            EntityIdsFilterModeEnum? entityIdsFilterMode = null,
            List<string>? translatedEntityIds = null,
            int? languageId = null)
                where T : class
                where U : class, ILanguageable
        {
            var entityIdsWithNames = await GetEntityIdsWithNamesInCurrentUserLanguageAsync<U>(entityIdsFilterMode, languageId, translatedEntityIds?.ToArray());
            var idProperty = typeof(T).GetProperty(idPropertyName);
            var nameProperty = typeof(T).GetProperty(namePropertyName);

            if (idProperty is not null && nameProperty is not null)
                list.ForEach(item => nameProperty.SetValue(item, entityIdsWithNames.GetNameForId(idProperty.GetValue(item)!.ToString()!)));
        }

        public async Task<List<ILanguageableItem>> GetEntityIdsWithNamesInCurrentUserLanguageAsync<TEntity>(
            EntityIdsFilterModeEnum? entityIdsFilterMode = null,
            int? languageId = null,
            params string[]? translatedEntityIds) where TEntity : class, ILanguageable
        {
            var result = new List<ILanguageableItem>();

            languageId ??= await _userLanguageService.GetCurrentUserLanguageIdAsync();

            if (!languageId.HasValue)
                return result;

            var rows = await _dbContext.Set<TEntity>()
                .Where(languageableItem => languageableItem.LanguageId == languageId.Value)
                .Select(languageableItem => new
                {
                    Id = languageableItem.GetTranslatedEntityId(),
                    languageableItem.Name
                })
                .ToListAsync();

            var IdsWithNames = rows
                .Where(entity =>
                {
                    if (entityIdsFilterMode is not null && translatedEntityIds is not null)
                    {
                        if (entityIdsFilterMode == EntityIdsFilterModeEnum.Include)
                        {
                            return translatedEntityIds.Contains(entity.Id);
                        }
                        if (entityIdsFilterMode == EntityIdsFilterModeEnum.Exclude)
                        {
                            return !translatedEntityIds.Contains(entity.Id);
                        }
                    }

                    return true;
                })
                .Select(entity => new
                {
                    EntityId = entity.Id,
                    entity.Name
                })
                .ToList();

            foreach (var idWithName in IdsWithNames)
                result.Add(new LanguageableItem(idWithName.EntityId.ToString(), idWithName.Name));


            return result;
        }
    }
}
