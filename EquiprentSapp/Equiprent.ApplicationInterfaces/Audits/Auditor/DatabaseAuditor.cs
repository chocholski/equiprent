using Equiprent.ApplicationInterfaces.Audits.Auditor;
using Equiprent.ApplicationInterfaces.Audits.Entries;
using Microsoft.EntityFrameworkCore;

namespace Equiprent.ApplicationImplementations.Audits.Auditor
{
    public class DatabaseAuditor : IAuditor
    {
        private readonly DbContext _dbContext;

        public DatabaseAuditor(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AuditAsync(IEnumerable<AuditEntryBase> auditEntries)
        {
            foreach (var entry in auditEntries)
                await AuditAsync(entry);
        }

        public async Task AuditAsync(AuditEntryBase auditEntry)
        {
            _dbContext.AddRange(auditEntry.ToAudit());

            await Task.CompletedTask;
        }

        public async Task SaveAuditsAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
