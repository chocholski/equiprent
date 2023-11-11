namespace Equiprent.Data.DbContext.ModelBuilderAppenders
{
    public interface IModelBuilderAppender
    {
        public abstract void AppendModelBuilder(ModelBuilder builder);
    }
}
