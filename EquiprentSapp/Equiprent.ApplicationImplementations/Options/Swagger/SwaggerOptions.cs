namespace Equiprent.ApplicationImplementations.Options.Swagger
{
    public class SwaggerOptions
    {
        public string? Name { get; set; }
        public OpenApiInfoOptions? OpenApiInfo { get; set; }
        public SecurityDefinitionInfo? SecurityDefinition { get; set; }
    }
}
