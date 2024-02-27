using Equiprent.Data.DbContext;
using Equiprent.Extensions;
using Mapster;
using System.Text;

namespace Equiprent.Data.CustomQueries.Builders.Where
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

            var firstClause = _whereClauseBuilderItems.First();
            _whereClauseBuilder
                    .Append('\t')
                    .Append(firstClause.TableName)
                    .Append('.')
                    .Append(firstClause.ColumnName)
                    .Append(' ')
                    .Append(WhereOperator.GetValue(firstClause.Operator))
                    .Append(firstClause.Operator == WhereOperatorEnum.In ? $"{Environment.NewLine}\t({Environment.NewLine}\t\t" : ' ')
                    .Append(firstClause.Condition)
                    .Append(firstClause.Operator == WhereOperatorEnum.In ? $"{Environment.NewLine}\t\t){Environment.NewLine}\t" : $"{Environment.NewLine}\t")
                    .Append(_whereClauseBuilderItems.Count != 1 ? Environment.NewLine : string.Empty);

            var remainingClauses = _whereClauseBuilderItems.Skip(1);
            foreach (var item in remainingClauses)
            {
                _whereClauseBuilder
                    .AppendLine(WhereOuterLogicalOperator.GetValue(item.OuterLogicalOperator))
                    .Append('\t')
                    .Append(item.TableName)
                    .Append('.')
                    .Append(item.ColumnName)
                    .Append(' ')
                    .Append(WhereOperator.GetValue(item.Operator))
                    .Append(item.Operator == WhereOperatorEnum.In ? $"{Environment.NewLine}\t({Environment.NewLine}\t\t" : ' ')
                    .Append(item.Condition)
                    .Append(item.Operator == WhereOperatorEnum.In ? $"{Environment.NewLine}\t\t){Environment.NewLine}\t" : $"{Environment.NewLine}\t");
            }

            _whereClauseBuilder.RemoveFromEnd($"{(_whereClauseBuilderItems.Last().Operator == WhereOperatorEnum.In ? $"{Environment.NewLine}\t\t){Environment.NewLine}\t" : $"{Environment.NewLine}\t")}");

            return _whereClauseBuilder.ToString();
        }
    }
}
