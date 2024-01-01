using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.WhereClauseCriterias;

namespace Equiprent.ApplicationInterfaces.Database.DbStatementBuilders
{
    public interface IDbStatementBuilder
    {
        string BuildOrderClause(string? columnName, int sortOrder);
        Task<string> BuildWhereClauseAsync(string? searchCriteria, CancellationToken cancellationToken = default);
        Task<string> BuildWhereClauseAsync(List<IWhereClauseCriteria> criteria, CancellationToken cancellationToken = default);
    }
}
