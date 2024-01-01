using Equiprent.ApplicationImplementations.Audits.Entries;
using Equiprent.ApplicationInterfaces.Audits.Auditor;
using Equiprent.ApplicationInterfaces.Audits.Entries;
using Equiprent.ApplicationInterfaces.Database.Events.Saving;
using Equiprent.ApplicationInterfaces.Users;
using Equiprent.Entities.Application.Audits;
using Equiprent.Entities.Attributes;
using Equiprent.Extensions;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Reflection;

namespace Equiprent.ApplicationImplementations.Database.Events.Saving
{
    public class DbContextSavingWithAuditingStrategy : AuditorObservableBase, IDbContextSavingStrategy
    {
        private readonly List<AuditEntryBase> _auditEntries = new();
        private readonly Guid? _currentUserId;

        public DbContextSavingWithAuditingStrategy(IUserService userService)
        {
            _currentUserId = userService.GetUserId();
        }

        public async Task OnAfterSaveChangesAsync(DbContext dbContext)
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
            await dbContext.SaveChangesAsync();

            return;
        }

        public async Task OnBeforeSaveChangesAsync(DbContext dbContext)
        {
            foreach (var entry in dbContext.ChangeTracker.Entries())
            {
                if (!ShouldEntryBeAudited(entry))
                    continue;

                LoadEntryIntoAudits(dbContext, entry);
            }

            await NotifyAuditorsWithEntriesAsync(_auditEntries.Where(entry => !entry.HasTemporaryProperties).ToArray());
            ReloadAuditEntriesLeavingTemporaryEntries();
        }

        private void LoadEntryIntoAudits(DbContext dbContext, EntityEntry entry)
        {
            var auditEntry = new AuditEntry(entry, _currentUserId)
            {
                TableName = entry.Metadata.GetTableName() ?? string.Empty
            };

            if (!string.IsNullOrEmpty(auditEntry.TableName))
                _auditEntries.Add(auditEntry);

            LoadEntryPropertiesIntoAudits(dbContext, entry, auditEntry);
        }

        private void LoadEntryPropertiesIntoAudits(DbContext dbContext, EntityEntry entry, AuditEntry auditEntry)
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
                        auditEntry.SetOldValuesWithEntityPropertyEntry(dbContext, entry, property);
                        break;

                    case EntityState.Modified:
                        HandleObjectModifications(dbContext, entry, auditEntry, property);
                        break;
                }
            }
        }

        private static string GetEntryPropertyName(PropertyEntry property) => property.Metadata.Name;

        private static bool IsPropertyAPrimaryKey(PropertyEntry property) => property.Metadata.IsPrimaryKey();

        private static bool ShouldEntryBeAudited(EntityEntry entry) =>
            entry.Entity is not Audit && entry.State is not (EntityState.Unchanged or EntityState.Detached);

        private void HandleObjectModifications(DbContext dbContext, EntityEntry entry, AuditEntry auditEntry, PropertyEntry property)
        {
            var propertyName = GetEntryPropertyName(property);

            if (property.OriginalValue is not null && property.CurrentValue is not null)
            {
                if (!property.OriginalValue.Equals(property.CurrentValue))
                {
                    auditEntry.SetOldValuesWithEntityPropertyEntry(dbContext, entry, property, GetOriginalValue);
                    auditEntry.SetNewValuesWithEntityPropertyEntry(dbContext, entry, property, GetCurrentValue);
                }
            }
            else if (property.OriginalValue is not null && property.CurrentValue is null)
            {
                auditEntry.SetOldValuesWithEntityPropertyEntry(dbContext, entry, property, GetOriginalValue);
                auditEntry.NewValues[propertyName] = null;
            }
            else if (property.OriginalValue is null && property.CurrentValue is not null)
            {
                auditEntry.OldValues[propertyName] = null;
                auditEntry.SetNewValuesWithEntityPropertyEntry(dbContext, entry, property, GetCurrentValue);
            }

        }

        private string? GetCurrentValue(DbContext dbContext, EntityEntry entry, PropertyEntry property) => GetValue(dbContext, entry, property, getCurrentValue: true);

        private string? GetOriginalValue(DbContext dbContext, EntityEntry entry, PropertyEntry property) => GetValue(dbContext, entry, property, getCurrentValue: false);

        private static string? GetValue(DbContext dbContext, EntityEntry entry, PropertyEntry property, bool getCurrentValue)
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
                    ? dbContext.Find((Type)translatedPropertyType, property.OriginalValue)
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

        private void ReloadAuditEntriesLeavingTemporaryEntries()
        {
            _auditEntries.RemoveAll(entry => !entry.HasTemporaryProperties);
        }
    }
}
