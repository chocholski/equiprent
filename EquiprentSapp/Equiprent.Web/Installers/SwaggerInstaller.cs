using Equiprent.ApplicationImplementations.Options.Swagger;
using Microsoft.OpenApi.Models;

namespace Equiprent.Web.Installers
{
    public class SwaggerInstaller : IInstaller
    {
        public void InstallServices(WebApplicationBuilder builder)
        {
            var swaggerOptions = new SwaggerOptions();

            builder.Configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);

            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(name: swaggerOptions.Name, new OpenApiInfo { Title = $"{Program.AppName} Api", Version = swaggerOptions.OpenApiInfo.Version });
                options.AddSecurityDefinition(name: swaggerOptions.SecurityDefinition.Name, new OpenApiSecurityScheme
                {
                    Name = swaggerOptions.SecurityDefinition.OpenApiSecurityScheme.Name,
                    Type = Enum.TryParse(swaggerOptions.SecurityDefinition.OpenApiSecurityScheme.Type, out SecuritySchemeType securitySchemeType)
                        ? securitySchemeType
                        : SecuritySchemeType.ApiKey,
                    Scheme = swaggerOptions.SecurityDefinition.OpenApiSecurityScheme.Scheme,
                    BearerFormat = swaggerOptions.SecurityDefinition.OpenApiSecurityScheme.BearerFormat,
                    In = Enum.TryParse(swaggerOptions.SecurityDefinition.OpenApiSecurityScheme.In, out ParameterLocation parameterLocation)
                        ? parameterLocation
                        : ParameterLocation.Header,
                    Description = swaggerOptions.SecurityDefinition.OpenApiSecurityScheme.Description
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = swaggerOptions.SecurityDefinition.OpenApiSecurityScheme.Name
                            }
                        },
                        Array.Empty<string>()
                    }
                });

                options.CustomSchemaIds(schemaIdSelector: type => type.FullName);
            });
        }
    }
}
