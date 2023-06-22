namespace Equiprent.ApplicationServices.Identities
{
    public record AuthenticationResult(string? Token, Guid? RefreshToken, int Expiration, int Code);
}
