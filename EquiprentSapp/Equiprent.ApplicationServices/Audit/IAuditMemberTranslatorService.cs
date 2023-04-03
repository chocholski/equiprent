namespace Equiprent.ApplicationServices.Audit
{
    public interface IAuditMemberTranslatorService
    {
        string Translate(string dbName);
        string GetDbName(string translation);
    }
}
