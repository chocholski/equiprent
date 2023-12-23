using Equiprent.ApplicationInterfaces.Audits.AuditKeyValues;

namespace Equiprent.ApplicationImplementations.Audits.AuditKeyValues
{
    public class AuditKeyValueService : IAuditKeyValueService
    {
        public string GetKeyFromValue(string value)
        {
            if (value.Contains('(') && value.EndsWith(')'))
            {
                if (value[(value.IndexOf('(') + 1)..].StartsWith("Id: "))
                    return value[(value.IndexOf(':') + 2)..^1];
            }

            return value;
        }

        public string CreateIdentityPartOfValueForComparison(int identity) => $"(Id: {identity})";
    }
}
