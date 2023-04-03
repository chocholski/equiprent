namespace Equiprent.Entities.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class AuditTranslationInfoAttribute : Attribute
    {
        public Type PropertyWithValueType { get; set; }
        public string FieldWithValue { get; private set; }

        public AuditTranslationInfoAttribute(Type propertyWithValueType, string fieldWithValue = "Name")
        {
            PropertyWithValueType = propertyWithValueType;
            FieldWithValue = fieldWithValue;
        }
    }
}
