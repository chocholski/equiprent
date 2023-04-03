using System.Security.Claims;
using Equiprent.Data.CustomQueryTypes;
using Equiprent.Entities.Application;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Threading;
using System.Reflection;
using Equiprent.Entities.Attributes;

namespace Equiprent.Data
{
    public class ApplicationDbContext : DbContext
    {
        /// <summary>
        /// For anonymize ticket data
        /// </summary>
        public bool OneTimeIgnoreAuditHandling { get; set; }

        private readonly int? _currentUserId;

        #region DbSet - Application

        public DbSet<ApplicationConfigurationKey> ConfigurationKeys { get; set; } = null!;
        public DbSet<User> ApplicationUsers { get; set; } = null!;
        public DbSet<UserRole> UserRoles { get; set; } = null!;
        public DbSet<Audit> Audits { get; set; } = null!;
        public DbSet<Language> Languages { get; set; } = null!;
        public DbSet<UserPermission> UserPermissions { get; set; } = null!;
        public DbSet<UserPermissionToRole> UserPermissionToRoles { get; set; } = null!;
        public DbSet<UserRoleToLanguage> UserRolesToLanguages { get; set; } = null!;

        #endregion

        #region DbSet - Business

        public DbSet<UserPermissionToUserPermission> UserPermissionToUserPermissions { get; set; } = null!;

        #endregion

        #region DbQuery<>

        public DbSet<AuditListQueryModel> AuditListItems { get; set; } = null!;

        #endregion

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public ApplicationDbContext(DbContextOptions options, IHttpContextAccessor httpAccessor) : this(options)
        {
            var val = httpAccessor.HttpContext?.User?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            _currentUserId = val != null ? Convert.ToInt32(val) : null;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<ApplicationConfigurationKey>().ToTable("ApplicationConfigurationKeys");
            modelBuilder.Entity<ApplicationConfigurationKey>().Property(x => x.Id).ValueGeneratedNever();

            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<User>().Property(user => user.Id)
                .HasAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Audit>().ToTable("Audits");
            modelBuilder.Entity<Audit>().Property(audit => audit.CreatedById);

            modelBuilder.Entity<AuditListQueryModel>().HasNoKey();
            
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(entityType => entityType.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }

        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            try
            {
                List<AuditEntry>? auditEntries = null;

                if (!OneTimeIgnoreAuditHandling)
                {
                    auditEntries = OnBeforeSaveChanges();
                }

                var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);

                if (!OneTimeIgnoreAuditHandling)
                {
                    await OnAfterSaveChangesAsync(auditEntries!);
                }

                OneTimeIgnoreAuditHandling = false;

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
                {
                    continue;
                }

                var auditEntry = new AuditEntry(entry, _currentUserId)
                {
                    TableName = entry.Metadata.GetTableName() ?? string.Empty
                };

                if (!string.IsNullOrEmpty(auditEntry.TableName))
                {
                    auditEntries.Add(auditEntry);
                }

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
                            auditEntry.KeyValue = int.Parse(property!.CurrentValue!.ToString()!);
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

            foreach (var auditEntry in auditEntries.Where(_ => !_.HasTemporaryProperties))
            {
                Audits.AddRange(auditEntry.ToAudit());
            }

            return auditEntries.Where(_ => _.HasTemporaryProperties).ToList();
            
        }

        private void HandleObjectModifications(EntityEntry entry, AuditEntry auditEntry, PropertyEntry property, string propertyName)
        {
           
            if (property.OriginalValue != null && property.CurrentValue != null)
            {
                if (!property.OriginalValue.Equals(property.CurrentValue))
                {
                    var entryType = entry.Entity.GetType().BaseType;
                    CustomAttributeData? translationAuditAttributeData = null;

                    if (entryType is not null)
                    {
                        foreach (PropertyInfo p in entryType.GetProperties())
                        {
                            if (property.Metadata.Name == p.Name)
                            {
                                translationAuditAttributeData = p.CustomAttributes.SingleOrDefault(x => x.AttributeType == typeof(AuditTranslationInfoAttribute));
                                break;
                            }
                        }
                    }

                    if (translationAuditAttributeData is not null && property.Metadata.Name != "StatusId")
                    {
                        auditEntry.OldValues[propertyName] = GetOriginalValue(entry, property);
                        auditEntry.NewValues[propertyName] = GetCurrentValue(entry, property);
                    }
                    else
                    {
                        auditEntry.OldValues[propertyName] = property.OriginalValue;
                        auditEntry.NewValues[propertyName] = property.CurrentValue;
                    }
                }
            }
            else
            {
                if (property.OriginalValue != null && property.CurrentValue == null)
                {
                    auditEntry.OldValues[propertyName] = GetOriginalValue(entry, property);
                    auditEntry.NewValues[propertyName] = null;
                }
                else if (property.OriginalValue == null && property.CurrentValue != null)
                {
                    auditEntry.OldValues[propertyName] = null;
                    auditEntry.NewValues[propertyName] = GetCurrentValue(entry, property);
                }
            }
            
        }

        private string? GetCurrentValue(EntityEntry entry, PropertyEntry property)
        {
            var entryType = entry.Entity.GetType().BaseType;
            CustomAttributeData? translationAuditAttributeData = null;

            if (entryType is not null)
            {
                foreach (PropertyInfo p in entryType.GetProperties())
                {
                    if (property.Metadata.Name == p.Name)
                    {
                        translationAuditAttributeData = p.CustomAttributes.SingleOrDefault(x => x.AttributeType == typeof(AuditTranslationInfoAttribute));
                        break;
                    }
                }
            }

            if (translationAuditAttributeData is not null && !property.Metadata.Name.Equals("StatusId"))
            {
                var translatedPropertyType = translationAuditAttributeData.ConstructorArguments.SingleOrDefault(x => x.ArgumentType == typeof(Type)).Value;
                var typeName = translatedPropertyType is not null ? ((Type)translatedPropertyType).Name : string.Empty;
                var translatedFieldName = translationAuditAttributeData!.ConstructorArguments.SingleOrDefault(x => x.ArgumentType == typeof(string)).Value?.ToString();
                var currentValueObj = translatedPropertyType is not null ? Find((Type)translatedPropertyType, property.CurrentValue) : null;
                PropertyInfo? translatedPropertyInfo = null;

                if (!string.IsNullOrEmpty(translatedFieldName))
                {
                    translatedPropertyInfo = currentValueObj?.GetType().GetProperty(translatedFieldName);
                }

                var currentValue = translatedPropertyInfo?.GetValue(currentValueObj);

                return $"{currentValue} (Id: {property.CurrentValue})";
            }
            else
            {
                return property.CurrentValue?.ToString();
            }
        }

        private string? GetOriginalValue(EntityEntry entry, PropertyEntry property)
        {
            var entryType = entry.Entity.GetType().BaseType;
            CustomAttributeData? translationAuditAttributeData = null;

            if (entryType is not null)
            {
                foreach (PropertyInfo p in entryType.GetProperties())
                {
                    if (property.Metadata.Name == p.Name)
                    {
                        translationAuditAttributeData = p.CustomAttributes.SingleOrDefault(x => x.AttributeType == typeof(AuditTranslationInfoAttribute));
                        break;
                    }
                }
            }

            if (translationAuditAttributeData is not null && !property.Metadata.Name.Equals("StatusId"))
            {
                var translatedPropertyType = translationAuditAttributeData.ConstructorArguments.SingleOrDefault(x => x.ArgumentType == typeof(Type)).Value;
                var typeName = translatedPropertyType is not null ? ((Type)translatedPropertyType).Name : string.Empty;
                var translatedFieldName = translationAuditAttributeData!.ConstructorArguments.SingleOrDefault(x => x.ArgumentType == typeof(string)).Value?.ToString();
                var originalValueObj = translatedPropertyType is not null ? Find((Type)translatedPropertyType, property.OriginalValue) : null;
                PropertyInfo? translatedPropertyInfo = null;

                if (!string.IsNullOrEmpty(translatedFieldName))
                {
                    translatedPropertyInfo = originalValueObj?.GetType().GetProperty(translatedFieldName);
                }
                
                var originalValue = translatedPropertyInfo?.GetValue(originalValueObj);

                return $"{originalValue} (Id: {property.OriginalValue})";
            }
            else
            {
                return property.OriginalValue?.ToString();
            }
        }

        private async Task<Task> OnAfterSaveChangesAsync(List<AuditEntry> auditEntries)
        {
            if (auditEntries is null || auditEntries.Count == 0)
            {
                return Task.CompletedTask;
            }

            foreach (var auditEntry in auditEntries)
            {
                foreach (var prop in auditEntry.TemporaryProperties)
                {
                    if (prop.Metadata.IsPrimaryKey())
                    {
                        auditEntry.KeyValue = int.Parse(prop?.CurrentValue?.ToString() ?? string.Empty);
                    }
                    else
                    {
                        auditEntry.NewValues[prop.Metadata.Name] = prop.CurrentValue;
                    }
                }

                Audits.AddRange(auditEntry.ToAudit());
            }

            await SaveChangesAsync();

            return Task.CompletedTask;
        }
    }

    internal class AuditEntry
    {
        private readonly int? _currentUserId;
        public EntityEntry Entry { get; }
        public string TableName { get; set; } = null!;
        public int KeyValue { get; set; }
        public Dictionary<string, object?> OldValues { get; } = new Dictionary<string, object?>();
        public Dictionary<string, object?> NewValues { get; } = new Dictionary<string, object?>();
        public List<PropertyEntry> TemporaryProperties { get; } = new List<PropertyEntry>();

        public bool HasTemporaryProperties => TemporaryProperties.Any();

        public AuditEntry(EntityEntry entry, int? currentUserId)
        {
            Entry = entry;
            _currentUserId = currentUserId;
        }
        
        public List<Audit> ToAudit()
        {
            var audits = new List<Audit>();

            if (NewValues.Count != 0)
            {
                foreach (var newValue in NewValues)
                {
                    var audit = new Audit
                    {
                        TableName = TableName,
                        CreatedOn = DateTime.Now,
                        KeyValue = KeyValue,
                        FieldName = newValue.Key,
                        CreatedById = _currentUserId ?? 1
                    };

                    if (OldValues.Count != 0)
                    {
                        audit.OldValue = OldValues.Any(item => item.Key == newValue.Key) && OldValues[newValue.Key] != null ? OldValues[newValue.Key]?.ToString() : null;
                    }
                    
                    audit.NewValue = newValue.Value?.ToString();

                    audits.Add(audit);
                }

            }

            return audits;
        }
    }
}
