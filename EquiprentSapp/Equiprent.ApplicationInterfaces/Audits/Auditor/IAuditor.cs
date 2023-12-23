using Equiprent.ApplicationInterfaces.Audits.Entries;

namespace Equiprent.ApplicationInterfaces.Audits.Auditor
{
    public interface IAuditor
    {
        public Task AuditAsync(AuditEntry auditEntry);
        public Task AuditAsync(IEnumerable<AuditEntry> auditEntries);
    }
}
