namespace Equiprent.Entities.Application.RefreshToken
{
    public class RefreshToken
    {
        [Key]
        public Guid Token { get; set; }

        public string JwtId { get; set; } = null!;

        public DateTime CreatedOn { get; set; }

        public bool Used { get; set; }

        public bool Invalidated { get; set; }

        public bool IsTokenRefreshRequired { get; set; }

        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
}
