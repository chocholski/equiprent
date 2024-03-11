using Equiprent.ApplicationInterfaces.Audits.Entries;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Diagnostics.CodeAnalysis;

namespace Equiprent.ApplicationImplementations.Audits.Entries
{
    public class AuditEntry : AuditEntryBase
    {
        [SetsRequiredMembers]
        public AuditEntry(EntityEntry original, string tableName, Guid? currentUserId) : base(original, tableName, currentUserId)
        {
        }
    }
}
