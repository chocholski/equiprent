namespace Equiprent.ApplicationImplementations.Database.CustomQueries.Where
{
    internal sealed class WhereOperator
    {
        private static readonly Dictionary<WhereOperatorEnum, string> Values = new()
        {
            { WhereOperatorEnum.Equals, "=" },
            { WhereOperatorEnum.GreaterThan, ">" },
            { WhereOperatorEnum.GreaterThanOrEquals, ">=" },
            { WhereOperatorEnum.In, "IN" },
            { WhereOperatorEnum.LessThan, "<" },
            { WhereOperatorEnum.LessThanOrEquals, "<=" },
            { WhereOperatorEnum.NotIn, "NOT IN" },
        };

        public static string GetValue(WhereOperatorEnum key) => Values.TryGetValue(key, out var value) ? value : string.Empty;
    }
}
