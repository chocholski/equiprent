namespace Equiprent.Entities.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class TranslatedEntityAttribute : Attribute
    {
        private readonly string _translatedEntityPropertyName;

        public TranslatedEntityAttribute(string translatedEntityPropertyName)
        {
            _translatedEntityPropertyName = translatedEntityPropertyName;
        }

        public string TranslatedEntityPropertyName { get { return _translatedEntityPropertyName; } }
    }
}
