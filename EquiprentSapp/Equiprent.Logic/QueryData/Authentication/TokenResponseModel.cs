
namespace Equiprent.Logic.QueryData.Authentication
{
    [JsonObject(MemberSerialization.OptOut)]
    public class TokenResponseModel
    {
        public string? token { get; set; }
        public Guid? refreshToken { get; set; }
        public int expiration { get; set; }
        public int code { get; set; }
    }
}
