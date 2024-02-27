namespace Equiprent.Data.CustomQueries.Builders.Join
{
    internal sealed class JoinType
    {
        private static readonly Dictionary<JoinTypeEnum, string> Values = new()
        {
            { JoinTypeEnum.Inner, "INNER" },
            { JoinTypeEnum.Left, "LEFT" },
            { JoinTypeEnum.Outer, "OUTER" },
            { JoinTypeEnum.Right, "RIGHT" },
        };

        public static string GetValue(JoinTypeEnum? key)
        {
            if (!key.HasValue)
                return string.Empty;

            return Values.TryGetValue(key.Value, out var value) ? value : string.Empty;
        }
    }
}
