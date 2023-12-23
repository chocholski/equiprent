using System.Threading;
using Equiprent.Data.DbContext.ModelBuilderAppenders;
using Equiprent.ApplicationInterfaces.Database.Events.Saving;
using Equiprent.ApplicationImplementations.Audits.Auditor;
using Equiprent.ApplicationInterfaces.Audits.Auditor;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private readonly Guid? _currentUserId;
        private readonly IDbContextSavingHandler? _dbContextSavingHandler;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            IDbContextSavingHandler dbContextSavingHandler) : base(options)
        {
            _dbContextSavingHandler = dbContextSavingHandler;
            ConfigureDbContextSavingHandler();
        }

        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            try
            {
                ChangeTracker.DetectChanges();
                await _dbContextSavingHandler!.OnBeforeSaveChangesAsync(this, _currentUserId);
                var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
                await _dbContextSavingHandler!.OnAfterSaveChangesAsync();

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
            if (_dbContextSavingHandler is AuditorObservable savingWithAuditsHandler)
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
