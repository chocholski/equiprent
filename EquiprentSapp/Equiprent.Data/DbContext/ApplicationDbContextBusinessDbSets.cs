using Equiprent.Entities.Business.Addresses;
using Equiprent.Entities.Business.ClientAddresses;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.ClientTypes;
using Equiprent.Entities.Business.ClientTypeToLanguages;
using Equiprent.Entities.Business.RentalCategories;
using Equiprent.Entities.Business.RentalCategoryToLanguages;
using Equiprent.Entities.Business.Rentals;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext
    {
        public DbSet<Address> Addresses { get; set; } = null!;
        public DbSet<ClientAddress> ClientAddresses { get; set; } = null!;
        public DbSet<Client> Clients { get; set; } = null!;
        public DbSet<ClientType> ClientTypes { get; set; } = null!;
        public DbSet<ClientTypeToLanguage> ClientTypeToLanguages { get; set; } = null!;
        public DbSet<RentalCategory> RentalCategories { get; set; } = null!;
        public DbSet<RentalCategoryToLanguage> RentalCategoriesToLanguages { get; set; } = null!;
        public DbSet<Rental> Rentals { get; set; } = null!;
    }
}
