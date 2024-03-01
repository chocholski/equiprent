using Equiprent.Entities.Business.Clients.Addresses;

namespace Equiprent.Entities.Business.Clients
{
    [Table("CompanyClients")]
    public class CompanyClient : Client, ICloneable<CompanyClient>, ICloneable<PrivateClient>
    {
        [InverseProperty(nameof(CompanyClientAddress.CompanyClient))]
        public virtual List<CompanyClientAddress> CompanyAddresses { get; set; } = new();
    }
}
