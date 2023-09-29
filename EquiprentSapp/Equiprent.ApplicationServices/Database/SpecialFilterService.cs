namespace Equiprent.ApplicationServices.Database
{
    public class SpecialFilterService : ISpecialFilterService
    {
        public async Task<string?> CreateSpecialConditionAsync(List<WhereClauseCriteria> criteria, string filterName, string filterValue) =>
            filterName switch
            {
                _ => null,
            };
    }
}
