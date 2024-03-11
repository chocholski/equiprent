namespace Equiprent.ApplicationImplementations.Options.Jwt
{
    public class TokenValidationParametersOptions
    {
        public bool ValidateIssuerSigningKey { get; set; } = true;
        public string? Key { get; set; }
        public bool ValidateIssuer { get; set; } = true;
        public string? ValidIssuer { get; set; }
        public bool ValidateAudience { get; set; } = true;
        public string? ValidAudience { get; set; }
        public bool ValidateLifetime { get; set; } = true;
        public bool RequireExpirationTime { get; set; } = true;
    }
}
