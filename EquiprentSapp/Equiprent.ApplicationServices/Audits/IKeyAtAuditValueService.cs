
namespace Equiprent.ApplicationServices.Audits
{
    public interface IKeyAtAuditValueService
    {
        string GetKeyFromValue(string value);
        string CreateIdentityPartOfValueForComparison(int identity);
    }
}