namespace Equiprent.ApplicationImplementations.Options.Swagger
{
    public class SwaggerOptions
    {
        public string Name { get; set; } = null!;
        public OpenApiInfoOptions OpenApiInfo { get; set; } = null!;
        public SecurityDefinitionInfo SecurityDefinition { get; set; } = null!;
    }
}
