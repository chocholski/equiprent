using Equiprent.Data.DbContext;
using Equiprent.Extensions;
using Mapster;
using System.Text;

namespace Equiprent.ApplicationImplementations.Database.CustomQueries.Where
{
    internal sealed class WhereClauseBuilder
    {
        private static readonly string _whereClause = "WHERE";

        private readonly ApplicationDbContext _dbContext;
        private readonly StringBuilder _whereClauseBuilder = new();
        private readonly HashSet<WhereClauseBuilderItem> _whereClauseBuilderItems = new();

        public WhereClauseBuilder(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public WhereClauseBuilder Where(WhereClause whereClause)
        {
            if (!ApplicationDbContext.HasTableOfName(whereClause.TableName))
                throw new ArgumentException($"There is no such table as {whereClause.TableName} in the database.");

            if (string.IsNullOrEmpty(ApplicationDbContext.GetPropertyName(whereClause.TableName)))
                throw new ArgumentException($"There is no DbSet property declared for table ${whereClause.TableName}");

            if (!_dbContext.HasTableAColumnOfName(whereClause.TableName, whereClause.ColumnName))
                throw new ArgumentException($"There is no column {whereClause.ColumnName} within table {whereClause.TableName}");

            if (!whereClause.Validate())
                throw new Exception("Invalid query.");

            var whereClauseBuilderItem = whereClause.Adapt<WhereClauseBuilderItem>();
            if (!string.IsNullOrEmpty(whereClause.TableAlias))
                whereClauseBuilderItem.TableName = whereClause.TableAlias;

            _whereClauseBuilderItems.Add(whereClauseBuilderItem);

            return this;
        }

        public string Build()
        {
            if (_whereClauseBuilderItems.IsNullOrEmpty())
                return string.Empty;

            _whereClauseBuilder
                .Append(_whereClause)
                .AppendLine();

            foreach (var item in _whereClauseBuilderItems)
            {
                _whereClauseBuilder
                    .Append('\t')
                    .Append(item.TableName)
                    .Append('.')
                    .Append(item.ColumnName)
                    .Append(' ')
                    .Append(WhereOperator.GetValue(item.Operator))
                    .Append(item.Operator == WhereOperatorEnum.In ? $"{Environment.NewLine}\t({Environment.NewLine}\t\t" : ' ')
                    .Append(item.Condition)
                    .Append(item.Operator == WhereOperatorEnum.In ? $"{Environment.NewLine}\t\t){Environment.NewLine}\t" : $"{Environment.NewLine}\t")
                    .Append(WhereOuterLogicalOperator.GetValue(item.OuterLogicalOperator))
                    .AppendLine();
            }

            _whereClauseBuilder.RemoveFromEnd($"{Environment.NewLine}");
            foreach (var whereOperator in WhereOuterLogicalOperator.GetValues())
            {
                _whereClauseBuilder.RemoveFromEnd(whereOperator);
            }

            _whereClauseBuilder.AppendLine();

            return _whereClauseBuilder.ToString();
        }
    }
}
