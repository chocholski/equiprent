namespace Equiprent.Data.CustomQueries.Builders.Join
{
    internal sealed class JoinClauseBuilderItem
    {
        public string JoinedForeignKey { get; set; }

        public string? JoinedTableAlias { get; set; }

        public string JoinedTableColumnKey { get; set; }

        public string JoinedTableColumnName { get; set; }

        public string JoinedTableName { get; set; }

        public JoinTypeEnum? JoinType { get; set; }

        public string TableName { get; set; }

        public JoinClauseBuilderItem(
            string tableName,
            string joinedForeignKey,
            string joinedTableName,
            string? joinedTableAlias,
            string joinedTableColumnKey,
            string joinedTableColumnName,
            JoinTypeEnum? joinType)
        {
            TableName = tableName;
            JoinedForeignKey = joinedForeignKey;
            JoinedTableName = joinedTableName;
            JoinedTableAlias = joinedTableAlias;
            JoinedTableColumnKey = joinedTableColumnKey;
            JoinedTableColumnName = joinedTableColumnName;
            JoinType = joinType;
        }

        public override bool Equals(object? obj)
        {
            var thisType = GetType();

            if (obj is null || thisType != obj.GetType())
                return false;

            var other = (JoinClauseBuilderItem)obj;
            var properties = thisType
                .GetProperties()
                .Where(p => p.Name != nameof(JoinedTableColumnName));

            return properties.All(prop =>
            {
                var thisValue = prop.GetValue(this);
                var otherValue = prop.GetValue(other);
                return Equals(thisValue, otherValue);
            });
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hash = 17;
                var properties = GetType()
                    .GetProperties()
                    .Where(prop => prop.Name != nameof(JoinedTableColumnName));

                foreach (var property in properties)
                {
                    hash *= 23;
                    hash += property.GetValue(this)?.GetHashCode() ?? 0;
                }

                return hash;
            }
        }
    }
}
