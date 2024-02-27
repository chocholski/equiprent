using Equiprent.ApplicationImplementations.Database.CustomQueries.Join;

namespace Equiprent.ApplicationImplementations.Database.CustomQueries
{
    public sealed class JoinedTable
    {
        public string? Alias { get; set; }

        public JoinTypeEnum? JoinType { get; set; }

        public string ColumnName { get; set; } = null!;

        public string Name { get; set; } = null!;

        public JoinedTable(string name, string key, JoinTypeEnum joinType)
        {
            Name = name;
            ColumnName = key;
            JoinType = joinType;
        }
    }
}
