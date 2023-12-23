using Equiprent.ApplicationInterfaces.Identities.Models;

namespace Equiprent.ApplicationImplementations.Identities.Models
{
    public class AuthenticationResult : IAuthenticationResult
    {
        public int Code { get; set; }
        public int Expiration { get; set; }
        public Guid? RefreshToken { get; set; }
        public string? Token { get; set; }

        public AuthenticationResult(string? token, Guid? refreshToken, int expiration, int code)
        {
            RefreshToken = refreshToken;
            Token = token;
            Expiration = expiration;
            Code = code;
        }
    }
}
