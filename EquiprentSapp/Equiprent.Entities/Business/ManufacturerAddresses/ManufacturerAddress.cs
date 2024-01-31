using Equiprent.Entities.Application.Addresses;

namespace Equiprent.Entities.Business.ManufacturerAddresses
{
    [Table("ManufacturerAddresses")]
    public class ManufacturerAddress : Address
    {
        public string NationalCompanyId { get; set; } = null!;
    }
}
