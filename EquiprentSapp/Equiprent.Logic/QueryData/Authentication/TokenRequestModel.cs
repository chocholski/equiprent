namespace Equiprent.Logic.QueryData.Authentication
{
    [JsonObject(MemberSerialization.OptOut)]
    public record TokenRequestModel(string grant_type, string? client_secret, string username, string password);
}
