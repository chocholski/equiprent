using Equiprent.Data.DbContext;
using Equiprent.Extensions;
using System.Text;

namespace Equiprent.ApplicationImplementations.Database.CustomQueries.Select
{
    internal sealed class SelectClauseBuilder
    {
        private static readonly string _selectClause = "SELECT";
        private static readonly string _fromClause = "FROM";

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
            _selectClauseBuilder.Append(_selectClause).Append(' ');
        }

        public SelectClauseBuilder AddColumn(CustomQueryColumn column)
        {
            if (!ApplicationDbContext.HasTableOfName(column.TableName))
                throw new ArgumentException($"There is no such table as {column.TableName} in the database.");

            if (string.IsNullOrEmpty(ApplicationDbContext.GetPropertyName(column.TableName)))
                throw new ArgumentException($"There is no DbSet property declared for table ${column.TableName}");

            if (!_dbContext.HasTableAColumnOfName(column.TableName, column.ColumnName))
                throw new ArgumentException($"There is no column {column.ColumnName} within table {column.TableName}");

            if (!column.Validate())
                throw new Exception("Invalid query.");

            _selectClauseBuilderItems.Add(new SelectClauseBuilderItem(
                TableName: !string.IsNullOrEmpty(column.TableAlias) ? column.TableAlias : column.TableName,
                column.ColumnName,
                column.ColumnAlias));

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
                    .Append($"{(!string.IsNullOrEmpty(item.ColumnAlias) ? $" AS {item.ColumnAlias}" : string.Empty)}")
                    .Append(',')
                    .AppendLine();
            }

            _selectClauseBuilder
                .RemoveFromEnd($",{Environment.NewLine}")
                .Append(' ')
                .Append(_fromClause)
                .Append(' ')
                .Append(_from);

            return _selectClauseBuilder.ToString();
        }
    }
}
