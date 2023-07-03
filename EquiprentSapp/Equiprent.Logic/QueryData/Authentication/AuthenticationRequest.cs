namespace Equiprent.Logic.QueryData.Authentication
{
    [JsonObject(MemberSerialization.OptOut)]
    public record AuthenticationRequest(string GrantType, string? ClientSecret, string UserName, string Password);
}
