using Equiprent.Entities.Business.ClientAddresses;

namespace Equiprent.Entities.Business.Clients
{
    public class CompanyClient : Client
    {
        [InverseProperty(nameof(ClientAddress.Client))]
        public virtual List<CompanyClientAddress> CompanyAddresses { get; set; } = new();
    }
}
