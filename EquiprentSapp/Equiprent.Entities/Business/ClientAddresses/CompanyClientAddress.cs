using Equiprent.Entities.Business.Clients;

namespace Equiprent.Entities.Business.ClientAddresses
{
    [Table("CompanyClientAddresses")]
    public class CompanyClientAddress : ClientAddress
    {
        [ForeignKey(nameof(CompanyClient))]
        public Guid CompanyClientId { get; set; }
        public virtual Client CompanyClient { get; set; } = null!;

        public string? NationalCompanyId { get; set; }
    }
}
