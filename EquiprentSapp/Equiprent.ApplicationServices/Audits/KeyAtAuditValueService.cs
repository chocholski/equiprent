
namespace Equiprent.ApplicationServices.Audits
{
    public class KeyAtAuditValueService : IKeyAtAuditValueService
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
