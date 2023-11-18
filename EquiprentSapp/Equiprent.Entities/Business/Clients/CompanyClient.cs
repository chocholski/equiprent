using Equiprent.Entities.Business.ClientLocations;

namespace Equiprent.Entities.Business.Clients
{
    public class CompanyClient : Client
    {
        [InverseProperty(nameof(ClientLocation.Client))]
        public virtual List<CompanyClientLocation> CompanyLocations { get; set; } = new();
    }
}
