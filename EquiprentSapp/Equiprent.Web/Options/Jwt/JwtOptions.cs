﻿namespace Equiprent.Web.Options.Jwt
{
    public class JwtOptions
    {
        public bool RequireHttpsMetadata { get; set; } = false;
        public bool SaveToken { get; set; } = true;
        public TokenValidationParametersOptions TokenValidationParameters { get; set; } = null!;
    }
}
