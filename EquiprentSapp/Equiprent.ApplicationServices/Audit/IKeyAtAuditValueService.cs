
namespace Equiprent.ApplicationServices.Audit
{
    public interface IKeyAtAuditValueService
    {
        string GetKeyFromValue(string value);
        string CreateIdentityPartOfValueForComparison(int identity);
    }
}