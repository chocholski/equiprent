namespace Equiprent.Data.DbContext.ModelBuilderAppenders
{
    public static class ModelBuilderExtensions
    {
        public static void AppendUsingAppendersInAssemblyForDbContext(this ModelBuilder builder, ApplicationDbContext dbContext)
        {
            typeof(ApplicationDbContext).Assembly.ExportedTypes
                .Where(t => typeof(IModelBuilderAppender).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
                .Select(Activator.CreateInstance)
                .Cast<IModelBuilderAppender>()
                .ToList()
                .ForEach(i => i.AppendModelBuilderForDbContext(builder, dbContext));
        }
    }
}
