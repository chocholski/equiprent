using Equiprent.Entities.Business.Clients.Addresses;

namespace Equiprent.Entities.Business.Clients
{
    [Table("PrivateClients")]
    public class PrivateClient : Client, ICloneable<PrivateClient>, ICloneable<CompanyClient>
    {
        public string FirstName { get; set; } = null!;
        
        public string LastName { get; set;} = null!;

        [InverseProperty(nameof(PrivateClientAddress.PrivateClient))]
        public virtual List<PrivateClientAddress> CitizenAddresses { get; set; } = new();
    }
}
