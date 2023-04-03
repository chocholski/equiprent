namespace Equiprent.Entities.Abstractions
{
    public abstract class DictionaryBase
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; } = null!;
    }
}
