namespace Equiprent.Entities.Application.Languages
{
    public class Language
    {
        [MaxLength(10)]
        public required string Code { get; set; }

        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public required string Name { get; set; }
    }
}
