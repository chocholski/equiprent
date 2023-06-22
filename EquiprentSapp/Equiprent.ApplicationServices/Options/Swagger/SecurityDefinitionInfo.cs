namespace Equiprent.ApplicationServices.Options.Swagger
{
    public class SecurityDefinitionInfo
    {
        public string Name { get; set; } = null!;
        public OpenApiSecuritySchemeInfo OpenApiSecurityScheme { get; set; } = null!;
    }
}
