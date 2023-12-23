namespace Equiprent.ApplicationInterfaces.Audits.AuditMemberTranslators
{
    public interface IAuditMemberTranslatorService
    {
        string Translate(string dbName);
        string GetDbName(string translation);
    }
}
