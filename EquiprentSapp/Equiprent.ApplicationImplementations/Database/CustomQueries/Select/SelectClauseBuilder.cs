using Equiprent.Data.DbContext;
using Equiprent.Extensions;
using System.Text;

namespace Equiprent.ApplicationImplementations.Database.CustomQueries.Select
{
    public sealed class SelectClauseBuilder
    {
        private static readonly string _selectClause = "SELECT ";
        private static readonly string _fromClause = "FROM ";

        private readonly ApplicationDbContext _dbContext;
        private readonly string _from;
        private readonly StringBuilder _selectClauseBuilder = new();
        private readonly HashSet<SelectClauseBuilderItem> _selectClauseBuilderItems = new();

        public SelectClauseBuilder(ApplicationDbContext dbContext, string from)
        {
            if (!ApplicationDbContext.HasTableOfName(from))
                throw new ArgumentException($"There is no such table as {from} in the database.");

            _dbContext = dbContext;
            _from = from;
            _selectClauseBuilder.Append(_selectClause);
        }

        public SelectClauseBuilder AddColumn(string tableName, string columnName, string? tableAlias = null, string? columnAlias = null)
        {
            if (!ApplicationDbContext.HasTableOfName(tableName))
                throw new ArgumentException($"There is no such table as {tableName} in the database.");

            if (string.IsNullOrEmpty(ApplicationDbContext.GetPropertyName(tableName)))
                throw new ArgumentException($"There is no DbSet property declared for table ${tableName}");

            if (!_dbContext.HasTableAColumnOfName(tableName, columnName))
                throw new ArgumentException($"There is no column {columnName} within table {tableName}");

            if (tableName.Contains(';') ||
                columnName.Contains(';') ||
                (!string.IsNullOrEmpty(tableAlias) && tableAlias.Contains(';')) ||
                (!string.IsNullOrEmpty(columnAlias) && columnAlias.Contains(';')))
            {
                throw new Exception("Invalid query.");
            }

            var selectClauseTableName = !string.IsNullOrEmpty(tableAlias) ? tableAlias : tableName;
            _selectClauseBuilderItems.Add(new SelectClauseBuilderItem(selectClauseTableName, columnName, columnAlias));

            return this;
        }

        public string Build()
        {
            if (_selectClauseBuilderItems.IsNullOrEmpty())
                throw new Exception("The select list of query should not be empty!");

            foreach (var item in _selectClauseBuilderItems)
            {
                _selectClauseBuilder.Append($"{item.TableName}.{item.ColumnName}{(!string.IsNullOrEmpty(item.ColumnAlias) ? $" AS {item.ColumnAlias}" : string.Empty)}, ");
            }

            _selectClauseBuilder.RemoveFromEnd(", ");
            _selectClauseBuilder.Append(' ');
            _selectClauseBuilder.Append($"{_fromClause} {_from}");

            return _selectClauseBuilder.ToString();
        }
    }
}
