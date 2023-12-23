namespace Equiprent.ApplicationInterfaces.Audits.AuditKeyValues
{
    public interface IAuditKeyValueService
    {
        string GetKeyFromValue(string value);
        string CreateIdentityPartOfValueForComparison(int identity);
    }
}
