using Equiprent.Entities.Application;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Equiprent.Data.DbContext
{
    internal record AuditEntry
    {
        public EntityEntry Entry { get; }
        public string TableName { get; set; } = null!;
        public string KeyValue { get; set; } = null!;
        public Dictionary<string, object?> OldValues { get; } = new();
        public Dictionary<string, object?> NewValues { get; } = new();
        public List<PropertyEntry> TemporaryProperties { get; } = new();
        public bool HasTemporaryProperties => TemporaryProperties.Any();

        private readonly Guid? _currentUserId;

        public AuditEntry(EntityEntry entry, Guid? currentUserId)
        {
            Entry = entry;

            _currentUserId = currentUserId;
        }

        public List<Audit> ToAudit()
        {
            var audits = new List<Audit>();

            if (NewValues.Any())
            {
                foreach (var newValue in NewValues)
                {
                    var audit = new Audit
                    {
                        TableName = TableName,
                        CreatedOn = DateTime.Now,
                        KeyValue = KeyValue,
                        FieldName = newValue.Key,
                        CreatedById = _currentUserId ?? null
                    };

                    if (OldValues.Any())
                        audit.OldValue = OldValues.Any(item => item.Key == newValue.Key) && OldValues[newValue.Key] != null
                            ? OldValues[newValue.Key]?.ToString() 
                            : null;

                    audit.NewValue = newValue.Value?.ToString();

                    audits.Add(audit);
                }

            }

            return audits;
        }
    }
}
