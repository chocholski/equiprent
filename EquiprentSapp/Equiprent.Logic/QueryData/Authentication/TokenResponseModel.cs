
namespace Equiprent.Logic.QueryData.Authentication
{
    [JsonObject(MemberSerialization.OptOut)]
    public class TokenResponseModel
    {
        public int code { get; set; }
        public int expiration { get; set; }
        public Guid? refreshToken { get; set; }
        public string? token { get; set; }
    }
}
