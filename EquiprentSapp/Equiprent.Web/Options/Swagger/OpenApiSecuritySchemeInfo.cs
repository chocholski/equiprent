namespace Equiprent.Web.Options.Swagger
{
    public class OpenApiSecuritySchemeInfo
    {
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!;
        public string Scheme { get; set; } = null!;
        public string BearerFormat { get; set; } = null!;
        public string In { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
