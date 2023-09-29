namespace Equiprent.Logic.QueryData.Authentication
{
    [JsonObject(MemberSerialization.OptOut)]
    public record AuthenticationRequest
    {
        public string? ClientSecret { get; set; }
        public string GrantType { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string UserName { get; set; } = null!;
    }
}
