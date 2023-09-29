using Equiprent.ApplicationServices.Database.Models;

namespace Equiprent.ApplicationServices.Database
{
    public interface ISpecialFilterService
    {
        Task<string?> CreateSpecialConditionAsync(List<WhereClauseCriteria>? criteria, string? filterName, string? filterValue);
    }
}
