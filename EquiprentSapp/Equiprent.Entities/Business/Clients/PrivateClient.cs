using Equiprent.Entities.Business.ClientLocations;

namespace Equiprent.Entities.Business.Clients
{
    public class PrivateClient : Client
    {
        public string FirstName { get; set; } = null!;
        
        public string LastName { get; set;} = null!;

        [InverseProperty(nameof(ClientLocation.Client))]
        public virtual List<PrivateClientLocation> CitizenLocations { get; set; } = new();
    }
}
