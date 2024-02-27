namespace Equiprent.Data.CustomQueries.Builders.Select
{
    internal sealed record SelectClauseBuilderItem(string TableName, string ColumnName, string? ColumnAlias)
    {
    }
}
