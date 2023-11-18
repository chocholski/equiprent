using Equiprent.Business.Clients;
using Equiprent.Entities.Application.Countries;

namespace Equiprent.Entities.Business.ClientLocations
{
    public partial class ClientLocation
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Country))]
        public Guid CountryId { get; set; }
        public virtual Country Country { get; set; } = null!;

        [ForeignKey(nameof(Client))]
        public Guid ClientId { get; set; }
        public virtual Client Client { get; set; } = null!;
    }
}
