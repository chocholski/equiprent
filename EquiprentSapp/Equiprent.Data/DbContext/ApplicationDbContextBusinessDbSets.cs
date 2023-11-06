using Equiprent.Entities.Business.Rental;
using Equiprent.Entities.Business.RentalCategories;
using Equiprent.Entities.Business.RentalCategoryToLanguage;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext
    {
        public DbSet<RentalCategory> RentalCategories { get; set; } = null!;
        public DbSet<RentalCategoryToLanguage> RentalCategoriesToLanguages { get; set; } = null!;
        public DbSet<Rental> Rentals { get; set; } = null!;
    }
}
