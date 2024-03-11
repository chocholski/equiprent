using Equiprent.ApplicationImplementations.Options.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;

namespace Equiprent.Web.Installers
{
    public class WebAppInstaller : IInstaller
    {
        public void InstallServices(WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: Program.CorsPolicyName, policyBuilder =>
                {
                    policyBuilder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            builder.Services.AddSpaStaticFiles(options =>
            {
                options.RootPath = Program.ConfigRootPath;
            });

            builder.Services
                .AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                });

            var jwtOptions = new JwtOptions();

            builder.Configuration.Bind(nameof(JwtOptions), jwtOptions);
            builder.Services.AddSingleton(jwtOptions);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = jwtOptions.TokenValidationParameters!.ValidateIssuerSigningKey,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.TokenValidationParameters!.Key!)),
                ValidIssuer = jwtOptions.TokenValidationParameters.ValidIssuer,
                ValidateIssuer = jwtOptions.TokenValidationParameters.ValidateIssuer,
                ValidAudience = jwtOptions.TokenValidationParameters.ValidAudience,
                ValidateAudience = jwtOptions.TokenValidationParameters.ValidateAudience,
                ValidateLifetime = jwtOptions.TokenValidationParameters.ValidateLifetime,
                ClockSkew = TimeSpan.Zero,
                RequireExpirationTime = jwtOptions.TokenValidationParameters.RequireExpirationTime
            };

            builder.Services.AddSingleton(tokenValidationParameters);

            builder.Services.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = tokenValidationParameters;
                });
        }
    }
}
