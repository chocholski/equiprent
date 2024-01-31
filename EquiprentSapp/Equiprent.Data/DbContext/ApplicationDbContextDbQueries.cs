using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Data.CustomQueryTypes.Equipments;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext
    {
        public DbSet<AuditListQueryModel> AuditListItems { get; set; } = null!;
        public DbSet<EquipmentListQueryModel> EquipmentListItems {  get; set; } = null!;
    }
}
