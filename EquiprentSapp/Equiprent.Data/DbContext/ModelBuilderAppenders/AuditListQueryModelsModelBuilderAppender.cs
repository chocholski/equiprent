using Equiprent.Data.CustomQueryTypes;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders
{
    public class AuditListQueryModelsModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilder(ModelBuilder builder)
        {
            builder.Entity<AuditListQueryModel>().HasNoKey();
        }
    }
}
