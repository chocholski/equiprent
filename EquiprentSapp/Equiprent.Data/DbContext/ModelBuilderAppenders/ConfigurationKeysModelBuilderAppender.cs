using Equiprent.Entities.Application.ConfigurationKeys;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders
{
    public class ConfigurationKeysModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilder(ModelBuilder builder)
        {
            builder.Entity<ConfigurationKey>().ToTable(nameof(ApplicationDbContext.ConfigurationKeys));
            builder.Entity<ConfigurationKey>().Property(c => c.Id).ValueGeneratedNever();
        }
    }
}
