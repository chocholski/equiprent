using Equiprent.Data.CustomQueryTypes;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Audits
{
    public class AuditListQueryModelsModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilder(ModelBuilder builder)
        {
            builder.Entity<AuditListQueryModel>().HasNoKey();
        }
    }
}
