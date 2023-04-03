using Equiprent.Entities.Attributes;
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
        public static int GetTranslatedEntityId(this ILanguageable languageableEntity)
        {
            PropertyInfo[] properties = languageableEntity.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                object[] attributes = property.GetCustomAttributes(true);
                foreach (object attribute in attributes)
                {
                    if (attribute is TranslatedEntityAttribute)
                    {
                        return Convert.ToInt32(property.GetValue(languageableEntity) ?? -1);
                    }
                }
            }

            return -1;
        }

        public static object? GetTranslatedEntity(this ILanguageable languageableEntity)
        {
            PropertyInfo[] properties = languageableEntity.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                object[] attributes = property.GetCustomAttributes(true);
                foreach (object attribute in attributes)
                {
                    if (attribute is TranslatedEntityAttribute translatedEntityAttribute)
                    {
                        var translatedEntityProperty = languageableEntity.GetType().GetProperty(translatedEntityAttribute.TranslatedEntityPropertyName);

                        if (translatedEntityProperty != null)
                        {
                            return translatedEntityProperty.GetValue(languageableEntity) ?? null;
                        }
                    }
                }
            }

            return null;
        }
    }
}
