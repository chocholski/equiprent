using Equiprent.Entities.Application.UserRoles;

namespace Equiprent.Entities.Application.UserRoleToLanguages
{
    public partial class UserRoleToLanguage
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public required string Name { get; set; }

        [ForeignKey(nameof(UserRole))]
        [TranslatedEntity(nameof(UserRole))]
        public int UserRoleId { get; set; }
        public virtual UserRole UserRole { get; set; } = null!;
    }
}
