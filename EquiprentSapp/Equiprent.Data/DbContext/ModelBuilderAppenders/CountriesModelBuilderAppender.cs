using Equiprent.Entities.Business.Countries;
using System.Globalization;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders
{
    public class CountriesModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilder(ModelBuilder builder)
        {
            var cultures = CultureInfo.GetCultures(CultureTypes.SpecificCultures);

            foreach (var culture in cultures)
            {
                var region = GetRegionForCulture(culture);

                builder.Entity<Country>().HasData(GetCountryForRegion(region));
            }
        }

        private static Country GetCountryForRegion(RegionInfo region)
        {
            return new Country
            {
                Id = region.GeoId,
                Name = region.EnglishName,
                Code = region.TwoLetterISORegionName
            };
        }

        private static RegionInfo GetRegionForCulture(CultureInfo culture) => new(culture.Name);
    }
}
