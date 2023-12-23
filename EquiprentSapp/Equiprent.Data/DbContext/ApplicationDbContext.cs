using System.Security.Claims;
using Microsoft.AspNetCore.Http;
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
        private readonly DbContextSavingWithAuditingListener _savingListener;

        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
            _savingListener = new DbContextSavingWithAuditingListener(this);

            RegisterSavingListenerAuditors();
        }

        public ApplicationDbContext(
            DbContextOptions options,
            IHttpContextAccessor httpAccessor) : this(options)
        {
            var userId = httpAccessor?.HttpContext?.User?.Claims
                .FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?
                .Value;

            _currentUserId = userId is not null && Guid.TryParse(userId, out Guid currentUserId) ? currentUserId : null;
        }

        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            try
            {
                await _savingListener.OnBeforeSaveChangesAsync(_currentUserId);

                var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);

                await _savingListener.OnAfterSaveChangesAsync();

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

        private void RegisterSavingListenerAuditors()
        {
            _savingListener.Subscribe(new DatabaseAuditor(this));

            var auditors = typeof(IAuditor).Assembly.ExportedTypes
                .Where(t =>
                    typeof(IAuditor).IsAssignableFrom(t) &&
                    !typeof(DatabaseAuditor).IsAssignableFrom(t) &&
                    !t.IsInterface &&
                    !t.IsAbstract)
                .Select(Activator.CreateInstance)
                .Cast<IAuditor>();

            foreach (var auditor in auditors)
                _savingListener.Subscribe(auditor);
        }
    }
}
