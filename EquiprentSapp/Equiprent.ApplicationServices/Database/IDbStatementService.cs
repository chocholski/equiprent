namespace Equiprent.ApplicationServices.Database
{
    public interface IDbStatementService
    {
        string BuildOrderClause(string? columnName, int sortOrder);
        Task<string> BuildWhereClauseAsync(string? searchCriteria);
        Task<string> BuildWhereClauseAsync(List<WhereClauseCriteria> criteria);
    }
}
