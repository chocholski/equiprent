namespace Equiprent.Entities.Application
{
    public partial class UserRoleToLanguage
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; } = null!;

        [ForeignKey("UserRole")]
        [TranslatedEntity("UserRole")]
        public int UserRoleId { get; set; }
        public virtual UserRole UserRole { get; set; } = null!;
    }
}
