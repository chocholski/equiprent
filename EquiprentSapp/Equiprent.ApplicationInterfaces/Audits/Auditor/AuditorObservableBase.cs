using Equiprent.ApplicationInterfaces.Audits.Entries;

namespace Equiprent.ApplicationInterfaces.Audits.Auditor
{
    public abstract class AuditorObservableBase
    {
        protected readonly List<IAuditor> _auditors = new();

        public void Subscribe(IAuditor auditor)
        {
            _auditors.Add(auditor);
        }

        public async Task NotifyAuditorsWithEntriesAsync(params AuditEntryBase[] auditEntries)
        {
            foreach (var auditor in _auditors)
                await auditor.AuditAsync(auditEntries);
        }

        public void Unsubscribe(IAuditor auditor)
        {
            _auditors.Remove(auditor);
        }
    }
}
