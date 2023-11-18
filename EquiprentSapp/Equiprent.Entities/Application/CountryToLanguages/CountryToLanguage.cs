using Equiprent.Entities.Application.Countries;

namespace Equiprent.Entities.Business.CountryToLanguages
{
    public partial class CountryToLanguage
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        [ForeignKey(nameof(Country))]
        [TranslatedEntity(nameof(Country))]
        public Guid CountryId { get; set; }
        public virtual Country Country { get; set; } = null!;
    }
}
