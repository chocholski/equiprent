using Equiprent.Data.CustomQueryTypes;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Audits
{
    public class AuditListQueryModelsModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilderForDbContext(ModelBuilder builder, ApplicationDbContext dbContext)
        {
            builder.Entity<AuditListQueryModel>().HasNoKey();
        }
    }
}
