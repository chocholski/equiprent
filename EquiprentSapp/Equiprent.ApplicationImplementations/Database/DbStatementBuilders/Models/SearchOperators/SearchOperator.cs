using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.SearchOperators;

namespace Equiprent.ApplicationImplementations.Database.DbStatementBuilders.Models.SearchOperators
{
    public static class SearchOperator
    {
        private static readonly Dictionary<string, SearchOperatorEnum> Values = new()
        {
            { "and", SearchOperatorEnum.And },
            { "or", SearchOperatorEnum.Or },
        };

        public static SearchOperatorEnum? GetValue(string key) => Values.TryGetValue(key, out var value) ? value : null;
    }
}
