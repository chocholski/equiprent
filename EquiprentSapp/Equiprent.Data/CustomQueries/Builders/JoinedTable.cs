using Equiprent.Data.CustomQueries.Builders.Join;

namespace Equiprent.Data.CustomQueries.Builders
{
    public sealed record JoinedTable(string Name, string ColumnKey, string ColumnName, JoinTypeEnum? JoinType)
    {
        public string? ColumnAlias { get; set; }

        public string? TableAlias { get; set; }
    }
}
