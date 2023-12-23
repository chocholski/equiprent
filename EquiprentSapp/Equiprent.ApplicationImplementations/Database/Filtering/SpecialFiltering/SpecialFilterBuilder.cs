using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.WhereClauseCriterias;
using Equiprent.ApplicationInterfaces.Database.Filtering.SpecialFiltering;

namespace Equiprent.ApplicationImplementations.Database.Filtering.SpecialFiltering
{
    public class SpecialFilterBuilder : ISpecialFilterBuilder
    {
        public async Task<string?> BuildSpecialConditionAsync(List<IWhereClauseCriteria> criteria, string filterName, string filterValue) =>
            filterName switch
            {
                _ => null,
            };
    }
}
