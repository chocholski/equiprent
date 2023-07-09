namespace Equiprent.Logic.QueryData.Authentication
{
    public record RefreshTokenRequest(string Token, Guid? RefreshToken);
}
