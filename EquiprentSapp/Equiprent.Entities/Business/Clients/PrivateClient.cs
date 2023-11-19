using Equiprent.Entities.Business.ClientAddresses;

namespace Equiprent.Entities.Business.Clients
{
    public class PrivateClient : Client
    {
        public string FirstName { get; set; } = null!;
        
        public string LastName { get; set;} = null!;

        [InverseProperty(nameof(ClientAddress.Client))]
        public virtual List<PrivateClientAddress> CitizenAddresses { get; set; } = new();
    }
}
