using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.WhereClauseCriterias;

namespace Equiprent.ApplicationInterfaces.Database.Filtering.SpecialFiltering
{
    public interface ISpecialFilterBuilder
    {
        Task<string?> BuildSpecialConditionAsync(IWhereClauseCriteria criterion);
    }
}
