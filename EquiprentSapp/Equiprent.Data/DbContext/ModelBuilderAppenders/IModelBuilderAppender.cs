namespace Equiprent.Data.DbContext.ModelBuilderAppenders
{
    public interface IModelBuilderAppender
    {
        public abstract void AppendModelBuilderForDbContext(ModelBuilder builder, ApplicationDbContext dbContext);
    }
}
