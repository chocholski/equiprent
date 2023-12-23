using Equiprent.ApplicationInterfaces.Audits.Entries;
using Equiprent.Data.DbContext;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Equiprent.ApplicationImplementations.Audits.Entries
{
    public record AuditEntry : AuditEntryBase
    {
        public AuditEntry(EntityEntry original, Guid? currentUserId) : base(original, currentUserId)
        {
        }

        public void SetOldValuesWithEntityPropertyEntry(
            ApplicationDbContext dbContext,
            EntityEntry entityEntry,
            PropertyEntry propertyEntry,
            Func<ApplicationDbContext, EntityEntry, PropertyEntry, string?>? valueGetter = null)
        {
            OldValues[propertyEntry.Metadata.Name] = valueGetter is null
                ? propertyEntry.OriginalValue!
                : valueGetter.Invoke(dbContext, entityEntry, propertyEntry);
        }

        public void SetNewValuesWithEntityPropertyEntry(
            ApplicationDbContext dbContext,
            EntityEntry entityEntry,
            PropertyEntry propertyEntry,
            Func<ApplicationDbContext, EntityEntry, PropertyEntry, string?>? valueGetter = null)
        {
            NewValues[propertyEntry.Metadata.Name] = valueGetter is null
                ? propertyEntry.OriginalValue!
                : valueGetter.Invoke(dbContext, entityEntry, propertyEntry);
        }
    }
}
