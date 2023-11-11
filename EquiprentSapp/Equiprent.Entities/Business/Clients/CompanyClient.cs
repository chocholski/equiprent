using Equiprent.Entities.Business.ClientToCountries;

namespace Equiprent.Entities.Business.Clients
{
    public class CompanyClient : Client
    {
        [InverseProperty(nameof(ClientToCountry.Client))]
        public virtual List<CompanyClientToCountry> CompanyCountries { get; set; } = new();
    }
}
