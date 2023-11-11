using Equiprent.Entities.Application.Users;

namespace Equiprent.Entities.Application.RefreshTokens
{
    public class RefreshToken
    {
        public DateTime CreatedOn { get; set; }

        public bool IsTokenRefreshRequired { get; set; }

        public bool Invalidated { get; set; }

        public string JwtId { get; set; } = null!;

        [Key]
        public Guid Token { get; set; }

        public bool Used { get; set; }

        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
}
