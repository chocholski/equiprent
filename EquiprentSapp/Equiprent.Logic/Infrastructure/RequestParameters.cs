using Equiprent.Logic.Attributes;
using System.Reflection;

namespace Equiprent.Logic.Infrastructure
{
    public class RequestParameters
    {
        [FromQuery(Name = "sf")]
        public string? SortColumnName { get; set; }
        [FromQuery(Name = "so")]
        public int SortOrder { get; set; }
        [FromQuery(Name = "pc")]
        public int PageCount { get; set; }
        [FromQuery(Name = "sr")]
        public int StartRow { get; set; }
        [FromQuery(Name = "f")]
        public string? SearchCriteria { get; set; }

        public RequestParameters GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(Type modelWithSortColumnNameType)
        {
            if (IsNullOrEmptySortColumnName())
            {
                SortColumnName = GetDefaultSortColumnName(modelWithSortColumnNameType);
            }

            return this;
        }

        private static string? GetDefaultSortColumnName(Type modelWithSortColumnNameType)
        {
            var propertyWithSortColumnNameAttributeName = modelWithSortColumnNameType
                .GetProperties()
                .SingleOrDefault(property => property.GetCustomAttribute<SortColumnAttribute>() != null)?
                .Name;

            return propertyWithSortColumnNameAttributeName;
        }

        private bool IsNullOrEmptySortColumnName() => string.IsNullOrEmpty(SortColumnName) || SortColumnName == "null";
    }
}
