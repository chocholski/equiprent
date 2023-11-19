namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Location
{
    public partial class LocationModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilder(ModelBuilder builder)
        {
            SeedCountries(builder);
            SeedLanguages(builder);
            SeedCountryToLanguages(builder);
        }
    }
}
