using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Data.CustomQueryTypes.Equipments;
using Equiprent.Data.CustomQueryTypes.Rentals;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext
    {
        public DbSet<AuditListQueryModel> AuditListItems { get; set; } = null!;
        public DbSet<EquipmentListQueryModel> EquipmentListItems { get; set; } = null!;
        public DbSet<RentalListQueryModel> RentalListItems { get; set; } = null!;
    }
}
