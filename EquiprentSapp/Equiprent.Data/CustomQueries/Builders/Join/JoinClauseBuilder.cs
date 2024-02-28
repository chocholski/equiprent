using Equiprent.Data.DbContext;
using Equiprent.Extensions;
using System.Text;

namespace Equiprent.Data.CustomQueries.Builders.Join
{
    internal sealed class JoinClauseBuilder
    {
        private static readonly string _joinClause = "JOIN";
        private static readonly string _onClause = "ON";

        private readonly ApplicationDbContext _dbContext;
        private readonly StringBuilder _joinClauseBuilder = new();
        private readonly HashSet<JoinClauseBuilderItem> _joinClauseBuilderItems = new();

        public JoinClauseBuilder(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public JoinClauseBuilder Join(CustomQueryColumn column)
        {
            try
            {
                ValidateColumnForJoin(column);
                ValidateTableExistence(column.TableName!);
                ValidateTableExistence(column.JoinedTable!.Name!);
                ValidateColumnWithinTableExistence(column.TableName!, column.ColumnName);
                ValidateColumnWithinTableExistence(column.TableName!, column.JoinedForeignKey!);
                ValidateColumnWithinTableExistence(column.JoinedTable!.Name, column.JoinedTable.ColumnName);

                if (!column.Validate())
                    throw new Exception("Invalid query.");
            }
            catch (Exception)
            {
                throw;
            }

            _joinClauseBuilderItems.Add(new JoinClauseBuilderItem(
                tableName: !string.IsNullOrEmpty(column.TableAlias) ? column.TableAlias : column.TableName!,
                joinedForeignKey: column.JoinedForeignKey!,
                joinedTableName: column.JoinedTable!.Name,
                joinedTableAlias: column.JoinedTable!.TableAlias,
                joinedTableColumnKey: column.JoinedTable!.ColumnKey,
                joinedTableColumnName: column.JoinedTable!.ColumnName,
                joinType: column.JoinedTable!.JoinType));

            return this;
        }

        public string Build()
        {
            if (_joinClauseBuilderItems.IsNullOrEmpty())
                return string.Empty;

            foreach (var item in _joinClauseBuilderItems)
            {
                var joinType = JoinType.GetValue(item.JoinType);
                var isAliasUsedForJoinedTable = !string.IsNullOrEmpty(item.JoinedTableAlias);

                _joinClauseBuilder
                    .Append($"{(!string.IsNullOrEmpty(joinType) ? $"{joinType} " : string.Empty)}")
                    .Append(_joinClause)
                    .AppendLine()
                    .Append('\t')
                    .Append(item.JoinedTableName)
                    .Append($"{(isAliasUsedForJoinedTable ? $" {item.JoinedTableAlias}" : string.Empty)}")
                    .AppendLine()
                    .Append(_onClause)
                    .AppendLine()
                    .Append('\t')
                    .Append(item.TableName)
                    .Append('.')
                    .Append(item.JoinedForeignKey)
                    .Append(" = ")
                    .Append(isAliasUsedForJoinedTable ? item.JoinedTableAlias : item.JoinedTableName)
                    .Append('.')
                    .Append(item.JoinedTableColumnKey)
                    .AppendLine();
            }

            return _joinClauseBuilder.ToString();
        }

        public static bool IsJoinedColumn(CustomQueryColumn column) =>
            !string.IsNullOrEmpty(column.JoinedTable?.Name) &&
            !string.IsNullOrEmpty(column.JoinedTable?.ColumnName) &&
            !string.IsNullOrEmpty(column.JoinedForeignKey) &&
            !(
                HaveTablesSameName(column.TableName!, column.JoinedTable.Name) &&
                HaveTablesSameAlias(column.TableAlias, column.JoinedTable.TableAlias)
            );

        private static bool HaveTablesSameName(string firstTableName, string secondTableName) =>
            firstTableName.Equals(secondTableName, StringComparison.OrdinalIgnoreCase);

        private static bool HaveTablesSameAlias(string? firstTableAlias, string? secondTableAlias) =>
            firstTableAlias is not null &&
            secondTableAlias is not null &&
            firstTableAlias.Equals(secondTableAlias, StringComparison.OrdinalIgnoreCase);

        private void ValidateColumnWithinTableExistence(string tableName, string columnName)
        {
            if (!_dbContext.HasTableAColumnOfName(tableName, columnName))
                throw new ArgumentException($"There is no column {columnName} within table {tableName}");
        }

        private static void ValidateColumnForJoin(CustomQueryColumn column)
        {
            if (!IsJoinedColumn(column))
                throw new Exception("No sufficient data provided to create join clause!");
        }

        private static void ValidateTableExistence(string tableName)
        {
            if (!ApplicationDbContext.HasTableOfName(tableName))
                throw new ArgumentException($"There is no such table as {tableName} in the database.");

            if (string.IsNullOrEmpty(ApplicationDbContext.GetPropertyName(tableName)))
                throw new ArgumentException($"There is no DbSet property declared for table ${tableName}");
        }
    }
}
