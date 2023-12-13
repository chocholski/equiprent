using System.Linq;
using System.Reflection;

namespace Equiprent.Entities.Interfaces
{
    public interface ILanguageable
    {
        public int LanguageId { get; set; }
        public string Name { get; set; }
    }

    public static class LanguageableExtension
    {
        public static string GetTranslatedEntityId(this ILanguageable languageableEntity)
        {
            return languageableEntity
                .GetType()
                .GetProperties()
                .Where(p => p.GetCustomAttribute<TranslatedEntityAttribute>(inherit: true) != null)
                .Select(p => p.GetValue(languageableEntity)?.ToString())
                .SingleOrDefault()
                ??
                string.Empty;
        }

        public static object? GetTranslatedEntity(this ILanguageable languageableEntity)
        {
            return languageableEntity
                .GetType()
                .GetProperties()
                .Select(p => p.GetCustomAttribute<TranslatedEntityAttribute>(inherit: true))
                .Where(a => a != null)
                .Select(a => languageableEntity.GetType().GetProperty(a!.TranslatedEntityPropertyName)?.GetValue(languageableEntity))
                .SingleOrDefault();
        }
    }
}
