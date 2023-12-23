using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.WhereClauseCriterias;

namespace Equiprent.ApplicationInterfaces.Database.DbStatementBuilders
{
    public interface IDbStatementBuilder
    {
        string BuildOrderClause(string? columnName, int sortOrder);
        Task<string> BuildWhereClauseAsync(string? searchCriteria);
        Task<string> BuildWhereClauseAsync(List<IWhereClauseCriteria> criteria);
    }
}
