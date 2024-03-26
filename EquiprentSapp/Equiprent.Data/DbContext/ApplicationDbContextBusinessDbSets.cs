using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.Clients.Addresses;
using Equiprent.Entities.Business.Clients.Representatives;
using Equiprent.Entities.Business.ClientTypes;
using Equiprent.Entities.Business.ClientTypeToLanguages;
using Equiprent.Entities.Business.Equipments;
using Equiprent.Entities.Business.Equipments.Photos;
using Equiprent.Entities.Business.Equipments.Types;
using Equiprent.Entities.Business.Equipments.Types.TypeToLanguages;
using Equiprent.Entities.Business.Manufacturers;
using Equiprent.Entities.Business.Manufacturers.Addresses;
using Equiprent.Entities.Business.RentalCategories;
using Equiprent.Entities.Business.RentalCategoryToLanguages;
using Equiprent.Entities.Business.Rentals;
using Equiprent.Entities.Business.Rentals.Sublettings;
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
        public DbSet<Equipment> Equipments { get; set; } = null!;
        public DbSet<EquipmentPhoto> EquipmentPhotos { get; set; } = null!;
        public DbSet<EquipmentType> EquipmentTypes { get; set; } = null!;
        public DbSet<EquipmentTypeToLanguage> EquipmentTypeToLanguages { get; set; } = null!;
        public DbSet<LeaseRental> LeaseRentals { get; set; } = null!;
        public DbSet<ManufacturerAddress> ManufacturerAddresses { get; set; } = null!;
        public DbSet<Manufacturer> Manufacturers { get; set; } = null!;
        public DbSet<PrivateClientAddress> PrivateClientAddresses { get; set; } = null!;
        public DbSet<PrivateClient> PrivateClients { get; set; } = null!;
        public DbSet<RentalCategory> RentalCategories { get; set; } = null!;
        public DbSet<RentalCategoryToLanguage> RentalCategoryToLanguages { get; set; } = null!;
        public DbSet<Rental> Rentals { get; set; } = null!;
        public DbSet<RentToOwnRental> RentToOwnRentals { get; set; } = null!;
        public DbSet<Representative> Representatives { get; set; } = null!;
        public DbSet<SubleaseRental> SubleaseRentals { get; set; } = null!;
        public DbSet<Subletting> Sublettings { get; set; } = null!;
    }
}
