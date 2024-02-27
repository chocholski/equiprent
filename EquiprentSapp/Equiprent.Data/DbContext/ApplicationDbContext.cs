using System.Threading;
using Equiprent.Data.DbContext.ModelBuilderAppenders;
using Equiprent.ApplicationInterfaces.Database.Events.Saving;
using Equiprent.ApplicationInterfaces.Audits.Auditor;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private readonly IDbContextSavingStrategy? _dbContextSavingHandler;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            IDbContextSavingStrategy dbContextSavingHandler) : base(options)
        {
            _dbContextSavingHandler = dbContextSavingHandler;
            ConfigureDbContextSavingHandler();
        }

        public static string? GetPropertyName(string tableName)
        {
            var property = typeof(ApplicationDbContext)
                .GetProperties()
                .FirstOrDefault(p =>
                    p.PropertyType.IsGenericType &&
                    p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>) &&
                    p.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase));

            return property?.Name;
        }

        public bool HasTableAColumnOfName(string tableName, string columnName)
        {
            var dbSetProperty = GetType()
                .GetProperties()
                .FirstOrDefault(p =>
                    p.PropertyType.IsGenericType &&
                    p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>) &&
                    p.PropertyType.GenericTypeArguments.Length == 1 &&
                    p.Name == tableName);

            if (dbSetProperty is null)
                return false;

            var entityType = dbSetProperty.PropertyType.GenericTypeArguments.FirstOrDefault();
            if (entityType is null)
                return false;

            return entityType.GetProperty(columnName) != null;
        }

        public static bool HasTableOfName(string name) =>
            typeof(ApplicationDbContext)
                .GetProperties()
                .Any(p =>
                    p.PropertyType.IsGenericType &&
                    p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>) &&
                    p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));

        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            try
            {
                ChangeTracker.DetectChanges();
                await _dbContextSavingHandler!.OnBeforeSaveChangesAsync(this);
                var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
                await _dbContextSavingHandler!.OnAfterSaveChangesAsync(this);
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.AppendUsingAppendersInAssembly();

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(entityType => entityType.GetForeignKeys()))
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }

        private void ConfigureDbContextSavingHandler()
        {
            if (_dbContextSavingHandler is AuditorObservableBase savingWithAuditsHandler)
            {
                savingWithAuditsHandler.Subscribe(new DatabaseAuditor(this));

                var auditors = typeof(IAuditor).Assembly.ExportedTypes
                    .Where(t =>
                        typeof(IAuditor).IsAssignableFrom(t) &&
                        !typeof(DatabaseAuditor).IsAssignableFrom(t) &&
                        !t.IsInterface &&
                        !t.IsAbstract)
                    .Select(Activator.CreateInstance)
                    .Cast<IAuditor>();

                foreach (var auditor in auditors)
                    savingWithAuditsHandler.Subscribe(auditor);
            }
        }
    }
}
