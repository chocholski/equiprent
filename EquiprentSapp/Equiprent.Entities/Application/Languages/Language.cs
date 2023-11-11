namespace Equiprent.Entities.Application.Languages
{
    public class Language
    {
        [MaxLength(10)]
        public string Code { get; set; } = null!;

        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; } = null!;
    }
}
