using Equiprent.Entities.Application.ConfigurationKeys;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.ConfigurationKeys
{
    public class ConfigurationKeysModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilderForDbContext(ModelBuilder builder, ApplicationDbContext dbContext)
        {
            builder.Entity<ConfigurationKey>().ToTable(nameof(ApplicationDbContext.ConfigurationKeys));
            builder.Entity<ConfigurationKey>().Property(c => c.Id).ValueGeneratedNever();
        }
    }
}
