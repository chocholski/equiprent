namespace Equiprent.ApplicationInterfaces.Identities.Models
{
    public interface IAuthenticationResult
    {
        public int Code { get; set; }
        public int Expiration { get; set; }
        public Guid? RefreshToken { get; set; }
        public string? Token { get; set; }
    }
}
