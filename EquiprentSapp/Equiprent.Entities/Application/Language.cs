namespace Equiprent.Entities.Application
{
    public class Language
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; } = null!;

        [MaxLength(10)]
        public string Code { get; set; } = null!;
    }
}
