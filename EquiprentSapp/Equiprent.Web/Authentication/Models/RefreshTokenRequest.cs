namespace Equiprent.Web.Authentication.Models
{
    public record RefreshTokenRequest(string Token, Guid? RefreshToken);
}
