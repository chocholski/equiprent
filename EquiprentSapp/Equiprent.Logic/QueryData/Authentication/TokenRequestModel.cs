namespace Equiprent.Logic.QueryData.Authentication
{
    [JsonObject(MemberSerialization.OptOut)]
    public class TokenRequestModel
    {
        public string grant_type { get; set; } = null!;
        public string? client_secret { get; set; }
        public string username { get; set; } = null!;
        public string password { get; set; } = null!;

        public TokenRequestModel()
        {
        }
     }
}
