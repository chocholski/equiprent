namespace Equiprent.ApplicationImplementations.Database.CustomQueries.Join
{
    internal sealed record JoinClauseBuilderItem(
        string TableName,
        string JoinedForeignKey,
        string JoinedTableName,
        string? JoinedTableAlias,
        string JoinedTableColumnName,
        JoinTypeEnum? JoinType)
    {

    }
}
