using Equiprent.Data.CustomQueryTypes.Audits;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext
    {
        public DbSet<AuditListQueryModel> AuditListItems { get; set; } = null!;
    }
}
