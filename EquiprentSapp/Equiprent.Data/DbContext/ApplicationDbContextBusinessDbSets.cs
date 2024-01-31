using Equiprent.Entities.Business.ClientAddresses;
using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.ClientTypes;
using Equiprent.Entities.Business.ClientTypeToLanguages;
using Equiprent.Entities.Business.RentalCategories;
using Equiprent.Entities.Business.RentalCategoryToLanguages;
using Equiprent.Entities.Business.Rentals;
using Equiprent.Entities.Business.Representatives;

namespace Equiprent.Data.DbContext
{
    public partial class ApplicationDbContext
    {
        public DbSet<ClientAddress> ClientAddresses { get; set; } = null!;
        public DbSet<CompanyClientAddress> CompanyClientAddresses { get; set; } = null!;
        public DbSet<ClientRepresentative> ClientRepresentatives { get; set; } = null!;
        public DbSet<Client> Clients { get; set; } = null!;
        public DbSet<CompanyClient> CompanyClients { get; set; } = null!;
        public DbSet<ClientType> ClientTypes { get; set; } = null!;
        public DbSet<ClientTypeToLanguage> ClientTypeToLanguages { get; set; } = null!;
        public DbSet<LeaseRental> LeaseRentals { get; set; } = null!;
        public DbSet<PrivateClientAddress> PrivateClientAddresses { get; set; } = null!;
        public DbSet<PrivateClient> PrivateClients { get; set; } = null!;
        public DbSet<RentalCategory> RentalCategories { get; set; } = null!;
        public DbSet<RentalCategoryToLanguage> RentalCategoryToLanguages { get; set; } = null!;
        public DbSet<Rental> Rentals { get; set; } = null!;
        public DbSet<RentToOwnRental> RentToOwnRentals { get; set; } = null!;
        public DbSet<Representative> Representatives { get; set; } = null!;
        public DbSet<SubleaseRental> SubleaseRentals { get; set; } = null!;
    }
}
