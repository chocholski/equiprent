namespace Equiprent.ApplicationServices.Database.Models
{
    public static class MatchMode
    {
        private static readonly Dictionary<string, MatchModeEnum> Values = new()
        {
            { "contains", MatchModeEnum.Contains },
            { "endsWith", MatchModeEnum.EndsWith },
            { "equals", MatchModeEnum.Equals },
            { "in", MatchModeEnum.In },
            { "notContains", MatchModeEnum.NotContains },
            { "notEquals", MatchModeEnum.NotEquals },
            { "startsWith", MatchModeEnum.StartsWith }
        };

        public static MatchModeEnum? GetValue(string key) => Values.TryGetValue(key, out var value) ? value : null;
    }
}
