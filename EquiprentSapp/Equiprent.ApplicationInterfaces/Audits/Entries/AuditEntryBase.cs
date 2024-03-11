using Equiprent.Entities.Application.Audits;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Diagnostics.CodeAnalysis;

namespace Equiprent.ApplicationInterfaces.Audits.Entries
{
    public class AuditEntryBase
    {
        public required EntityEntry Entry { get; init; }
        public required string TableName { get; init; }
        public string? KeyValue { get; private set; }
        public Dictionary<string, object?> OldValues { get; init; } = new();
        public Dictionary<string, object?> NewValues { get; init; } = new();
        public List<PropertyEntry> TemporaryProperties { get; init; } = new();
        public bool HasTemporaryProperties => TemporaryProperties.Any();

        protected readonly Guid? _currentUserId;

        [SetsRequiredMembers]
        public AuditEntryBase(EntityEntry entry, string tableName, Guid? currentUserId)
        {
            Entry = entry;
            TableName = tableName;
            _currentUserId = currentUserId;
        }

        public void SetKeyValueWithEntityPropertyEntry(PropertyEntry propertyEntry)
        {
            KeyValue = propertyEntry.CurrentValue?.ToString() ?? string.Empty;
        }

        public void SetNewValuesWithEntityPropertyEntry(
            DbContext dbContext,
            EntityEntry entityEntry,
            PropertyEntry propertyEntry,
            Func<DbContext, EntityEntry, PropertyEntry, string?>? valueGetter = null)
        {
            NewValues[propertyEntry.Metadata.Name] = valueGetter is null
                ? propertyEntry.OriginalValue!
                : valueGetter.Invoke(dbContext, entityEntry, propertyEntry);
        }

        public void SetOldValuesWithEntityPropertyEntry(
            DbContext dbContext,
            EntityEntry entityEntry,
            PropertyEntry propertyEntry,
            Func<DbContext, EntityEntry, PropertyEntry, string?>? valueGetter = null)
        {
            OldValues[propertyEntry.Metadata.Name] = valueGetter is null
                ? propertyEntry.OriginalValue!
                : valueGetter.Invoke(dbContext, entityEntry, propertyEntry);
        }

        public List<Audit> ToAudit()
        {
            var audits = new List<Audit>();

            if (!NewValues.Any())
                return audits;

            foreach (var newKeyValuePair in NewValues)
            {
                if (KeyValue is null)
                    continue;

                var audit = new Audit
                {
                    TableName = TableName!,
                    CreatedOn = DateTime.Now,
                    KeyValue = KeyValue,
                    FieldName = newKeyValuePair.Key,
                    CreatedById = _currentUserId
                };

                if (OldValues.Any())
                    audit.OldValue = GetOldValueForKey(newKeyValuePair.Key);

                audit.NewValue = newKeyValuePair.Value?.ToString();
                audits.Add(audit);
            }

            return audits;
        }

        private string? GetOldValueForKey(string newValueKey)
        {
            return OldValues.Any(item => item.Key == newValueKey) && OldValues[newValueKey] is not null
                ? OldValues[newValueKey]?.ToString()
                : null;
        }
    }
}
