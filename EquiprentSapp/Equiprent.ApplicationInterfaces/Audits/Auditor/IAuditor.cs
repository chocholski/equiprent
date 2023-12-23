using Equiprent.ApplicationInterfaces.Audits.Entries;

namespace Equiprent.ApplicationInterfaces.Audits.Auditor
{
    public interface IAuditor
    {
        public Task AuditAsync(AuditEntryBase auditEntry);
        public Task AuditAsync(IEnumerable<AuditEntryBase> auditEntries);
    }
}
