using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.MatchModes;

namespace Equiprent.ApplicationImplementations.Database.DbStatementBuilders.Models.MatchModes
{
    public static class MatchMode
    {
        private static readonly Dictionary<string, MatchModeEnum> Values = new()
        {
            { "contains", MatchModeEnum.Contains },
            { "dateIs", MatchModeEnum.DateIs },
            { "dateAfter", MatchModeEnum.DateIsAfter },
            { "dateBefore", MatchModeEnum.DateIsBefore },
            { "dateIsNot", MatchModeEnum.DateIsNot },
            { "endsWith", MatchModeEnum.EndsWith },
            { "equals", MatchModeEnum.Equals },
            { "gt", MatchModeEnum.GreaterThan },
            { "gte", MatchModeEnum.GreaterThanOrEqualTo },
            { "in", MatchModeEnum.In },
            { "lt", MatchModeEnum.LessThan },
            { "lte", MatchModeEnum.LessThanOrEqualTo },
            { "notContains", MatchModeEnum.NotContains },
            { "notEquals", MatchModeEnum.NotEquals },
            { "startsWith", MatchModeEnum.StartsWith }
        };

        public static MatchModeEnum? GetValue(string key) => Values.TryGetValue(key, out var value) ? value : null;
    }
}
