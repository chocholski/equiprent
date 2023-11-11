using Equiprent.Business.Clients;
using Equiprent.Entities.Business.Countries;

namespace Equiprent.Entities.Business.ClientToCountries
{
    public partial class ClientToCountry
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Country))]
        public int CountryId { get; set; }
        public virtual Country Country { get; set; } = null!;

        [ForeignKey(nameof(Client))]
        public Guid ClientId { get; set; }
        public virtual Client Client { get; set; } = null!;
    }
}
