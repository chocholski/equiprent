using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.WhereClauseCriterias;

namespace Equiprent.ApplicationInterfaces.Database.Filtering.SpecialFiltering
{
    public interface ISpecialFilterBuilder
    {
        Task<string?> BuildSpecialConditionAsync(List<IWhereClauseCriteria>? criteria, string? filterName, string? filterValue);
    }
}
