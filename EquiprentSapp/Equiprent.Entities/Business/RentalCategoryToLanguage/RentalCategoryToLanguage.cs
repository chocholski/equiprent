using Equiprent.Entities.Business.RentalCategories;

namespace Equiprent.Entities.Business.RentalCategoryToLanguage
{
    public partial class RentalCategoryToLanguage
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; } = null!;

        [ForeignKey(nameof(RentalCategory))]
        [TranslatedEntity(nameof(RentalCategory))]
        public int RentalCategoryId { get; set; }
        public virtual RentalCategory RentalCategory { get; set; } = null!;
    }
}
