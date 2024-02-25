namespace Equiprent.ApplicationImplementations.Database.CustomQueries.Select
{
    internal sealed record SelectClauseBuilderItem(string TableName, string ColumnName, string? ColumnAlias)
    {
    }
}
