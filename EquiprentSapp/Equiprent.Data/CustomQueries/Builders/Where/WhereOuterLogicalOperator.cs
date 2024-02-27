namespace Equiprent.Data.CustomQueries.Builders.Where
{
    internal sealed class WhereOuterLogicalOperator
    {
        private static readonly Dictionary<WhereOuterLogicalOperatorEnum, string> Values = new()
        {
            { WhereOuterLogicalOperatorEnum.And, "AND" },
            { WhereOuterLogicalOperatorEnum.Or, "OR" }
        };

        public static string GetValue(WhereOuterLogicalOperatorEnum key) => Values.TryGetValue(key, out var value) ? value : string.Empty;

        public static HashSet<string> GetValues() => Values.Select(v => v.Value).ToHashSet();
    }
}
