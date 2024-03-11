namespace Equiprent.Entities.Application.Countries
{
    public class Country
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(3)]
        public required string Code { get; set; }
    }
}
