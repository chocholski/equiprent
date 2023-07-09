namespace Equiprent.Logic.QueryData.Authentication
{
    [JsonObject(MemberSerialization.OptOut)]
    public record AuthenticationRequest
    {
        public string GrantType { get; set; } = null!;
        public string? ClientSecret { get; set; }
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
