using Equiprent.Entities.Business.Clients.Addresses;
using System.Diagnostics.CodeAnalysis;

namespace Equiprent.Entities.Business.Clients
{
    [Table("PrivateClients")]
    public class PrivateClient : Client, ICloneable<PrivateClient>, ICloneable<CompanyClient>
    {
        public required string FirstName { get; set; }
        
        public required string LastName { get; set; }

        [InverseProperty(nameof(PrivateClientAddress.PrivateClient))]
        public virtual List<PrivateClientAddress> CitizenAddresses { get; set; } = new();

        [SetsRequiredMembers]
        public PrivateClient() { }
    }
}
