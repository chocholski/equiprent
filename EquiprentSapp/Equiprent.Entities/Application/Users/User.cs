using Equiprent.Entities.Application.Languages;
using Equiprent.Entities.Application.UserRoles;

namespace Equiprent.Entities.Application.Users
{
    public partial class User
    {
        public Guid? ChangePasswordToken { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; }

        [MaxLength(200)]
        public required string FirstName { get; set; }

        [Key]
        public Guid Id { get; set; }

        public bool HasDarkModeThemeSelected { get; set; }

        public bool IsActive { get; set; }

        [ForeignKey(nameof(Language))]
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; } = null!;

        [MaxLength(50)]
        public required string Login { get; set; }

        [MaxLength(100)]
        public required string Password { get; set; }

        [MaxLength(200)]
        public required string LastName { get; set; }

        [ForeignKey(nameof(UserRole))]
        public int UserRoleId { get; set; }
        public virtual UserRole UserRole { get; set; } = null!;       

        public string GetName() => $"{LastName}{(!string.IsNullOrEmpty(FirstName) ? $" {FirstName}" : string.Empty)}";

        public void ChangePassword(string password)
        {
            ChangePasswordToken = null;
            Password = password;
        }
    }
}
