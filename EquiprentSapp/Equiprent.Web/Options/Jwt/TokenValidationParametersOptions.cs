namespace Equiprent.Web.Options.Jwt
{
    public class TokenValidationParametersOptions
    {
        public bool ValidateIssuerSigningKey { get; set; } = true;
        public string Key { get; set; } = null!;
        public bool ValidateIssuer { get; set; } = true;
        public string ValidIssuer { get; set; } = null!;
        public bool ValidateAudience { get; set; } = true;
        public string ValidAudience { get; set; } = null!;
        public bool ValidateLifetime { get; set; } = true;
        public bool RequireExpirationTime { get; set; } = true;
    }
}
