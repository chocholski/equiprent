namespace Equiprent.Data.CustomQueries.Builders.Where
{
    public record WhereClause(string TableName, string ColumnName, WhereOuterLogicalOperatorEnum OuterLogicalOperator, WhereOperatorEnum Operator, string Condition)
    {
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
