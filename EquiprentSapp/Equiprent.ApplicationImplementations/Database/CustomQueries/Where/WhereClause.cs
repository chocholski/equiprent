namespace Equiprent.ApplicationImplementations.Database.CustomQueries.Where
{
    public class WhereClause
    {
        public required string ColumnName { get; set; }

        public required string Condition { get; set; }

        public required WhereOperatorEnum Operator { get; set; }

        public required WhereOuterLogicalOperatorEnum OuterLogicalOperator { get; set; }

        public required string TableName { get; set; }

        public string? TableAlias { get; set; }

        public bool Validate()
        {
            return !GetType()
                .GetProperties()
                .Where(p =>
                    (
                        p.PropertyType == typeof(string) ||
                        Nullable.GetUnderlyingType(p.PropertyType) == typeof(string)
                    ) &&
                    (((string?)p.GetValue(this))?.Contains(';') ?? false))
                .Any();
        }
    }
}
