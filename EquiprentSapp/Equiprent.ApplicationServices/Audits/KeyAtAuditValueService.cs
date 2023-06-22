
namespace Equiprent.ApplicationServices.Audits
{
    public class KeyAtAuditValueService : IKeyAtAuditValueService
    {
        public string GetKeyFromValue(string value)
        {
            if (value.Contains(')') && value.IndexOf(')') == value.Length - 1)
            {
                if (value.Contains('('))
                {
                    var indexOfBrace = value.IndexOf('(');
                    var valueString = value[(indexOfBrace + 1)..];

                    if (valueString.StartsWith("Id: "))
                    {
                        return valueString[4..^1];
                    }
                }
            }
            return value;
        }

        public string CreateIdentityPartOfValueForComparison(int identity)
        {
            return $"(Id: {identity})";
        }

        public static string CreateIdentityPartOfValueTemplateForComparison()
        {
            return "(Id: {0})";
        }
    }
}
