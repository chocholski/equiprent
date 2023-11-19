using Equiprent.Entities.Application.Audits;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Audits
{
    public class AuditsModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilder(ModelBuilder builder)
        {
            builder.Entity<Audit>().ToTable(nameof(ApplicationDbContext.Audits));
            builder.Entity<Audit>().Property(a => a.CreatedById);
        }
    }
}
