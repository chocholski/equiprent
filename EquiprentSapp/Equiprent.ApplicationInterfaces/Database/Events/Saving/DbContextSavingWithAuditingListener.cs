using Equiprent.ApplicationInterfaces.Audits.Auditor;
using Equiprent.ApplicationInterfaces.Audits.Entries;
using Equiprent.Entities.Application.Audits;
using Equiprent.Entities.Attributes;
using Equiprent.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Reflection;

namespace Equiprent.ApplicationInterfaces.Database.Events.Saving
{
    public class DbContextSavingWithAuditingListener : AuditorObservable, IDbContextSavingListener
    {
        private readonly DbContext _dbContext;
        private readonly List<AuditEntry> _auditEntries = new();

        public DbContextSavingWithAuditingListener(DbContext dbContext) : base()
        {
            _dbContext = dbContext;
        }

        public async Task OnAfterSaveChangesAsync()
        {
            if (_auditEntries.IsNullOrEmpty())
                return;

            foreach (var entry in _auditEntries)
            {
                foreach (var temporaryProperty in entry.TemporaryProperties)
                {
                    if (IsPropertyAPrimaryKey(temporaryProperty))
                        entry.SetKeyValueWithEntityPropertyEntry(temporaryProperty);
                    else
                        entry.NewValues[temporaryProperty.Metadata.Name] = temporaryProperty?.CurrentValue;
                }

                await NotifyAuditorsWithEntriesAsync(entry);
            }

            _auditEntries.Clear();

            return;
        }

        public async Task OnBeforeSaveChangesAsync(Guid? currentUserId)
        {
            _dbContext.ChangeTracker.DetectChanges();

            foreach (var entry in _dbContext.ChangeTracker.Entries())
            {
                if (!ShouldEntryBeAudited(entry))
                    continue;

                LoadEntryIntoAudits(entry, currentUserId);
            }

            ReloadAuditEntriesExcludingTemporaryEntries();
            await NotifyAuditorsWithEntriesAsync(_auditEntries.ToArray());
        }

        private void LoadEntryIntoAudits(EntityEntry entry, Guid? currentUserId)
        {
            var auditEntry = new AuditEntry(entry, currentUserId)
            {
                TableName = entry.Metadata.GetTableName() ?? string.Empty
            };

            if (!string.IsNullOrEmpty(auditEntry.TableName))
                _auditEntries.Add(auditEntry);

            LoadEntryPropertiesIntoAudits(entry, auditEntry);
        }

        private void LoadEntryPropertiesIntoAudits(EntityEntry entry, AuditEntry auditEntry)
        {
            foreach (var property in entry.Properties)
            {
                if (property is null)
                    continue;

                if (property.IsTemporary)
                {
                    auditEntry.TemporaryProperties.Add(property);
                    continue;
                }

                if (IsPropertyAPrimaryKey(property))
                {
                    auditEntry.SetKeyValueWithEntityPropertyEntry(property!);
                    continue;
                }

                switch (entry.State)
                {
                    case EntityState.Added:
                        break;

                    case EntityState.Deleted:
                        auditEntry.SetOldValuesWithEntityPropertyEntry(entry, property);
                        break;

                    case EntityState.Modified:
                        HandleObjectModifications(entry, auditEntry, property);
                        break;
                }
            }
        }

        private static string GetEntryPropertyName(PropertyEntry property) => property.Metadata.Name;

        private static bool IsPropertyAPrimaryKey(PropertyEntry property) => property.Metadata.IsPrimaryKey();

        private static bool ShouldEntryBeAudited(EntityEntry entry) =>
            entry.Entity is not Audit && entry.State is not (EntityState.Unchanged or EntityState.Detached);

        private void HandleObjectModifications(EntityEntry entry, AuditEntry auditEntry, PropertyEntry property)
        {
            var propertyName = GetEntryPropertyName(property);

            if (property.OriginalValue is not null && property.CurrentValue is not null)
            {
                if (!property.OriginalValue.Equals(property.CurrentValue))
                {
                    auditEntry.SetOldValuesWithEntityPropertyEntry(entry, property, GetOriginalValue);
                    auditEntry.SetNewValuesWithEntityPropertyEntry(entry, property, GetCurrentValue);
                }
            }
            else if (property.OriginalValue is not null && property.CurrentValue is null)
            {
                auditEntry.SetOldValuesWithEntityPropertyEntry(entry, property, GetOriginalValue);
                auditEntry.NewValues[propertyName] = null;
            }
            else if (property.OriginalValue is null && property.CurrentValue is not null)
            {
                auditEntry.OldValues[propertyName] = null;
                auditEntry.SetNewValuesWithEntityPropertyEntry(entry, property, GetCurrentValue);
            }

        }

        private string? GetCurrentValue(EntityEntry entry, PropertyEntry property) => GetValue(entry, property, getCurrentValue: true);

        private string? GetOriginalValue(EntityEntry entry, PropertyEntry property) => GetValue(entry, property, getCurrentValue: false);

        private string? GetValue(EntityEntry entry, PropertyEntry property, bool getCurrentValue)
        {
            var entryType = entry.Entity.GetType().BaseType;

            var translationAuditAttributeData = entryType?.GetProperties()
                .Where(p => p.Name == property.Metadata.Name)
                .Select(p => p.CustomAttributes.SingleOrDefault(a => a.AttributeType == typeof(AuditTranslationInfoAttribute)))
                .SingleOrDefault();

            if (translationAuditAttributeData is not null && property.Metadata.Name is not "StatusId")
            {
                var translatedPropertyType = translationAuditAttributeData.ConstructorArguments
                    .SingleOrDefault(a => a.ArgumentType == typeof(Type))
                    .Value;

                var typeName = translatedPropertyType is not null
                    ? ((Type)translatedPropertyType).Name
                    : string.Empty;

                var translatedFieldName = translationAuditAttributeData.ConstructorArguments
                    .SingleOrDefault(a => a.ArgumentType == typeof(string))
                    .Value?
                    .ToString();

                var valueObj = translatedPropertyType is not null
                    ? _dbContext.Find((Type)translatedPropertyType, property.OriginalValue)
                    : null;

                PropertyInfo? translatedPropertyInfo = null;

                if (!string.IsNullOrEmpty(translatedFieldName))
                    translatedPropertyInfo = valueObj?.GetType().GetProperty(translatedFieldName);

                var value = translatedPropertyInfo?.GetValue(valueObj);

                return $"{value} (Id: {(getCurrentValue ? property.CurrentValue : property.OriginalValue)})";
            }
            else
                return getCurrentValue
                    ? property.CurrentValue?.ToString()
                    : property.OriginalValue?.ToString();
        }

        private void ReloadAuditEntriesExcludingTemporaryEntries()
        {
            _auditEntries.RemoveAll(entry => entry.HasTemporaryProperties);
        }
    }
}
