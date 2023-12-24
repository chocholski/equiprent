using Equiprent.ApplicationInterfaces.Audits.Entries;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Equiprent.ApplicationImplementations.Audits.Entries
{
    public record AuditEntry : AuditEntryBase
    {
        public AuditEntry(EntityEntry original, Guid? currentUserId) : base(original, currentUserId)
        {
        }
    }
}
