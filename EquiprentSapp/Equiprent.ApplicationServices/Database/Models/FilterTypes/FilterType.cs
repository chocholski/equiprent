namespace Equiprent.ApplicationServices.Database.Models.FilterTypes
{
    public static class FilterType
    {
        private static readonly Dictionary<string, FilterTypeEnum> Values = new()
        {
            { "date", FilterTypeEnum.Date },
            { "numeric", FilterTypeEnum.Numeric },
            { "text", FilterTypeEnum.Text },
        };

        public static FilterTypeEnum GetValue(string key) => Values.TryGetValue(key, out var value) ? value : FilterTypeEnum.Text;
    }
}
