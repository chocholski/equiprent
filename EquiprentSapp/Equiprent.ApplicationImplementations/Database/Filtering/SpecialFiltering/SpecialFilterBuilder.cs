using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.WhereClauseCriterias;
using Equiprent.ApplicationInterfaces.Database.Filtering.SpecialFiltering;
using Equiprent.Data.DbContext;

namespace Equiprent.ApplicationImplementations.Database.Filtering.SpecialFiltering
{
    public class SpecialFilterBuilder : ISpecialFilterBuilder
    {
        public async Task<string?> BuildSpecialConditionAsync(IWhereClauseCriteria criterion)
        {
            var fieldData = criterion.FieldName!.Split(".");
            if (fieldData.Length != 2)
                return null;

            var tableName = fieldData[0];
            if (!DoesTableExistWithinApplication(tableName))
                return null;

            var fieldName = fieldData[1];

            return await Task.FromResult(tableName switch
            {
                _ => (string?)null
            });
        }

        private static bool DoesTableExistWithinApplication(string tableName)
        {
            return typeof(ApplicationDbContext)
                .GetProperties()
                .Where(p =>
                    p.PropertyType.IsGenericType &&
                    p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>))
                .Any(p => p.Name.Equals(tableName, StringComparison.OrdinalIgnoreCase));
        }
    }
}
