namespace Equiprent.Entities.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class AuditTranslationInfoAttribute : Attribute
    {
        public string FieldWithValue { get; private set; }
        public Type PropertyWithValueType { get; set; }

        public AuditTranslationInfoAttribute(Type propertyWithValueType, string fieldWithValue = "Name")
        {
            PropertyWithValueType = propertyWithValueType;
            FieldWithValue = fieldWithValue;
        }
    }
}
