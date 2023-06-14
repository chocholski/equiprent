﻿namespace Equiprent.Entities.Application
{
    public partial class User
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(50)]
        public string Login { get; set; } = null!;

        [MaxLength(100)]
        public string Password { get; set; } = null!;

        [MaxLength(200)]
        public string FirstName { get; set; } = null!;

        [MaxLength(200)]
        public string LastName { get; set; } = null!;

        public bool IsActive { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; } = null!;

        public Guid? ChangePasswordToken { get; set; }

        public Guid? RefreshToken { get; set; }

        public bool IsTokenRefreshRequired { get; set; }

        [ForeignKey("Language")]
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; } = null!;

        [ForeignKey("UserRole")]
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
