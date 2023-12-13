using Equiprent.ApplicationServices.Languageables.Enums;
using Equiprent.ApplicationServices.Languageables.Models;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Entities.Interfaces;

namespace Equiprent.ApplicationServices.Languageables
{
    public class LanguageableService : ILanguageableService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userResolverService;
        public LanguageableService(ApplicationDbContext dbContext, IUserService userResolverService)
        {
            _dbContext = dbContext;
            _userResolverService = userResolverService;
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

        public async Task<List<LanguageableItem>> GetEntityIdsWithNamesInCurrentUserLanguageAsync<TEntity>(
            EntityIdsFilterModeEnum? entityIdsFilterMode = null,
            int? languageId = null,
            params string[]? translatedEntityIds) where TEntity : class, ILanguageable
        {
            var result = new List<LanguageableItem>();

            languageId ??= await _userResolverService.GetCurrentUserLanguageIdAsync();

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
