namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location
{
    public partial class LocationModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilderForDbContext(ModelBuilder builder, ApplicationDbContext dbContext)
        {
            SeedCountries(builder);
            SeedLanguages(builder);
            SeedCountryToLanguages(builder);
        }
    }
}
