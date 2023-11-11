using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Threading;
using System.Reflection;
using Equiprent.Entities.Attributes;
using Equiprent.Data.DbContext.ModelBuilderAppenders;
using Equiprent.Entities.Application.Audits;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private readonly Guid? _currentUserId;

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public ApplicationDbContext(DbContextOptions options, IHttpContextAccessor httpAccessor) : this(options)
        {
            var userId = httpAccessor?.HttpContext?.User?.Claims
                .FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?
                .Value;

            _currentUserId = userId is not null && Guid.TryParse(userId, out Guid currentUserId)
                ? currentUserId
                : null;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.AppendUsingAppendersInAssembly();

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(entityType => entityType.GetForeignKeys()))
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }

        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            try
            {
                var auditEntries = OnBeforeSaveChanges();
                var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);

                await OnAfterSaveChangesAsync(auditEntries);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        private List<AuditEntry> OnBeforeSaveChanges()
        {
            ChangeTracker.DetectChanges();

            var auditEntries = new List<AuditEntry>();

            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.Entity is Audit ||
                    entry.State == EntityState.Detached ||
                    entry.State == EntityState.Unchanged)
                    continue;

                var auditEntry = new AuditEntry(entry, _currentUserId)
                {
                    TableName = entry.Metadata.GetTableName() ?? string.Empty
                };

                if (!string.IsNullOrEmpty(auditEntry.TableName))
                    auditEntries.Add(auditEntry);

                foreach (var property in entry.Properties)
                {
                    if (property is not null)
                    {
                        if (property.IsTemporary)
                        {
                            auditEntry.TemporaryProperties.Add(property);

                            continue;
                        }

                        var propertyName = property.Metadata.Name;

                        if (property.Metadata.IsPrimaryKey())
                        {
                            auditEntry.KeyValue = property!.CurrentValue!.ToString()!;

                            continue;
                        }

                        switch (entry.State)
                        {
                            case EntityState.Added:
                                break;

                            case EntityState.Deleted:
                                auditEntry.OldValues[propertyName] = property!.OriginalValue!;
                                break;

                            case EntityState.Modified:
                                HandleObjectModifications(entry, auditEntry, property, propertyName);
                                break;
                        }
                    }
                }
            }

            foreach (var auditEntry in auditEntries.Where(a => !a.HasTemporaryProperties))
                Audits.AddRange(auditEntry.ToAudit());

            return auditEntries.Where(a => a.HasTemporaryProperties).ToList();

        }

        private void HandleObjectModifications(EntityEntry entry, AuditEntry auditEntry, PropertyEntry property, string propertyName)
        {
            if (property.OriginalValue is not null && property.CurrentValue is not null)
            {
                if (!property.OriginalValue.Equals(property.CurrentValue))
                {
                    auditEntry.OldValues[propertyName] = GetOriginalValue(entry, property);
                    auditEntry.NewValues[propertyName] = GetCurrentValue(entry, property);
                }
            }
            else if (property.OriginalValue is not null && property.CurrentValue is null)
            {
                auditEntry.OldValues[propertyName] = GetOriginalValue(entry, property);
                auditEntry.NewValues[propertyName] = null;
            }
            else if (property.OriginalValue is null && property.CurrentValue is not null)
            {
                auditEntry.OldValues[propertyName] = null;
                auditEntry.NewValues[propertyName] = GetCurrentValue(entry, property);
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
                    ? Find((Type)translatedPropertyType, property.OriginalValue)
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

        private async Task<Task> OnAfterSaveChangesAsync(List<AuditEntry> auditEntries)
        {
            if (auditEntries is null || !auditEntries.Any())
                return Task.CompletedTask;

            foreach (var auditEntry in auditEntries)
            {
                foreach (var prop in auditEntry.TemporaryProperties)
                {
                    if (prop.Metadata.IsPrimaryKey())
                        auditEntry.KeyValue = prop?.CurrentValue?.ToString() ?? string.Empty;
                    else
                        auditEntry.NewValues[prop.Metadata.Name] = prop?.CurrentValue;
                }

                Audits.AddRange(auditEntry.ToAudit());
            }

            await SaveChangesAsync();

            return Task.CompletedTask;
        }
    }
}
