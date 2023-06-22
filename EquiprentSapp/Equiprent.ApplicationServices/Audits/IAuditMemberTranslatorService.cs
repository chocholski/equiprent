namespace Equiprent.ApplicationServices.Audits
{
    public interface IAuditMemberTranslatorService
    {
        string Translate(string dbName);
        string GetDbName(string translation);
    }
}
