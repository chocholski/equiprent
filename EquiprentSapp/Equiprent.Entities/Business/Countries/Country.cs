namespace Equiprent.Entities.Business.Countries
{
    public class Country
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        [MaxLength(2)]
        public string Code { get; set; } = null!;
    }
}
