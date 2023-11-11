using Equiprent.Entities.Business.ClientToCountries;

namespace Equiprent.Entities.Business.Clients
{
    public class PrivateClient : Client
    {
        public string FirstName { get; set; } = null!;
        
        public string LastName { get; set;} = null!;

        [InverseProperty(nameof(ClientToCountry.Client))]
        public virtual List<PrivateClientToCountry> CitizenCountries { get; set; } = new();
    }
}
