using Equiprent.Entities.Business.RentalCategories;

namespace Equiprent.Entities.Business.RentalCategoryToLanguages
{
    public partial class RentalCategoryToLanguage
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public required string Name { get; set; }

        [ForeignKey(nameof(RentalCategory))]
        [TranslatedEntity(nameof(RentalCategory))]
        public int RentalCategoryId { get; set; }
        public virtual RentalCategory RentalCategory { get; set; } = null!;
    }
}
