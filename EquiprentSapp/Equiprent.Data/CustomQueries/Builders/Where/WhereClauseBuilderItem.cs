namespace Equiprent.Data.CustomQueries.Builders.Where
{
    internal sealed class WhereClauseBuilderItem
    {
        public required string ColumnName { get; set; }

        public required string Condition { get; set; }

        public required WhereOperatorEnum Operator { get; set; }

        public required WhereOuterLogicalOperatorEnum OuterLogicalOperator { get; set; }

        public required string TableName { get; set; }
    }
}
