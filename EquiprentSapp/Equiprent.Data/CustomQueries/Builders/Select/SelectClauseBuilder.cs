using Equiprent.Data.DbContext;
using Equiprent.Extensions;
using System.Text;

namespace Equiprent.Data.CustomQueries.Builders.Select
{
    internal sealed class SelectClauseBuilder
    {
        private static readonly string _asClause = "AS";
        private static readonly string _selectClause = "SELECT";
        private static readonly string _fromClause = "FROM";

        private readonly ApplicationDbContext _dbContext;
        private readonly string _fromTable;
        private readonly string? _fromTableAlias;
        private readonly StringBuilder _selectClauseBuilder = new();
        private readonly HashSet<SelectClauseBuilderItem> _selectClauseBuilderItems = new();
        private readonly HashSet<string> _selectClauseBuilderEmptyColumnItems = new();

        public SelectClauseBuilder(ApplicationDbContext dbContext, string fromTable, string? fromTableAlias = null)
        {
            if (!ApplicationDbContext.HasTableOfName(fromTable))
                throw new ArgumentException($"There is no such table as {fromTable} in the database.");

            _dbContext = dbContext;
            _fromTable = fromTable;
            _fromTableAlias = fromTableAlias;
            _selectClauseBuilder.Append(_selectClause).Append(' ');
        }

        public SelectClauseBuilder AddColumn(CustomQueryColumn column)
        {
            if (string.IsNullOrEmpty(column.TableName))
                column.TableName = _fromTable;

            if (!ApplicationDbContext.HasTableOfName(column.TableName))
                throw new ArgumentException($"There is no such table as {column.TableName} in the database.");

            if (string.IsNullOrEmpty(ApplicationDbContext.GetPropertyName(column.TableName)))
                throw new ArgumentException($"There is no DbSet property declared for table {column.TableName}");

            if (!_dbContext.HasTableAColumnOfName(column.TableName, column.ColumnName))
                throw new ArgumentException($"There is no column {column.ColumnName} within table {column.TableName}");

            if (!column.Validate())
                throw new Exception("Invalid query.");

            if (column.TableName == _fromTable &&
                string.IsNullOrEmpty(column.TableAlias) &&
                !string.IsNullOrEmpty(_fromTableAlias))
            {
                column.TableAlias = _fromTableAlias;
            }

            _selectClauseBuilderItems.Add(new SelectClauseBuilderItem(
                TableName: !string.IsNullOrEmpty(column.TableAlias) ? column.TableAlias : column.TableName,
                column.ColumnName,
                column.ColumnAlias));

            return this;
        }

        public SelectClauseBuilder AddEmptyColumnWithAlias(string columnAlias)
        {
            if (string.IsNullOrEmpty(columnAlias) || columnAlias.Contains(';'))
                throw new ArgumentException("Invalid select query item!");

            _selectClauseBuilderEmptyColumnItems.Add(columnAlias);

            return this;
        }

        public string Build()
        {
            if (_selectClauseBuilderItems.IsNullOrEmpty())
                throw new Exception("The query select clause should not be empty!");

            foreach (var item in _selectClauseBuilderItems)
            {
                _selectClauseBuilder
                    .Append(item.TableName)
                    .Append('.')
                    .Append(item.ColumnName)
                    .Append($"{(!string.IsNullOrEmpty(item.ColumnAlias) ? $" {_asClause} {item.ColumnAlias}" : string.Empty)}")
                    .Append(',')
                    .AppendLine();
            }

            foreach (var item in _selectClauseBuilderEmptyColumnItems)
            {
                _selectClauseBuilder
                    .Append("\' \'")
                    .Append(' ')
                    .Append(_asClause)
                    .Append(' ')
                    .Append(item)
                    .Append(',')
                    .AppendLine();
            }

            _selectClauseBuilder
                .RemoveFromEnd($",{Environment.NewLine}")
                .Append(' ')
                .Append(_fromClause)
                .Append(' ')
                .Append(_fromTable)
                .Append(!string.IsNullOrEmpty(_fromTableAlias) ? $" {_fromTableAlias}" : string.Empty);

            return _selectClauseBuilder.ToString();
        }
    }
}
