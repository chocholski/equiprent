using Equiprent.Data.CustomQueries.Builders.Join;
using Equiprent.Data.CustomQueries.Builders.Select;
using Equiprent.Data.CustomQueries.Builders.Where;
using Equiprent.Data.DbContext;
using System.Text;

namespace Equiprent.Data.CustomQueries.Builders
{
    public class CustomQueryBuilder
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly StringBuilder _customQueryBuilder = new();
        private readonly JoinClauseBuilder _joinClauseBuilder;
        private readonly SelectClauseBuilder _selectClauseBuilder;
        private readonly string? _tableAlias;
        private readonly string _tableName;
        private readonly WhereClauseBuilder _whereClauseBuilder;

        public CustomQueryBuilder(ApplicationDbContext dbContext, string tableName, string? tableAlias = null)
        {
            _dbContext = dbContext;
            _joinClauseBuilder = new JoinClauseBuilder(_dbContext);
            _selectClauseBuilder = new SelectClauseBuilder(_dbContext, fromTable: tableName, fromTableAlias: tableAlias);
            _tableAlias = tableAlias;
            _tableName = tableName;
            _whereClauseBuilder = new WhereClauseBuilder(_dbContext);
        }

        public CustomQueryBuilder AddEmptySelectColumnWithAlias(string columnAlias)
        {
            _selectClauseBuilder.AddEmptyColumnWithAlias(columnAlias);
            return this;
        }

        public CustomQueryBuilder AddSelectColumn(CustomQueryColumn column)
        {
            _selectClauseBuilder.AddColumn(column);
            return this;
        }

        public CustomQueryBuilder AddSelectColumnWithJoin(CustomQueryColumn column)
        {
            if (string.IsNullOrEmpty(column.TableName))
                column.TableName = _tableName;

            if (string.IsNullOrEmpty(column.TableAlias) && !string.IsNullOrEmpty(_tableAlias))
                column.TableAlias = _tableAlias;

            if (JoinClauseBuilder.IsJoinedColumn(column))
            {
                AddSelectColumn(new CustomQueryColumn(column.JoinedTable!.ColumnName) with
                {
                    ColumnAlias = column.JoinedTable.ColumnAlias,
                    TableAlias = column.JoinedTable.TableAlias,
                    TableName = column.JoinedTable!.Name,
                });
                Join(column);
            }
            else
            {
                AddSelectColumn(column);
            }

            return this;
        }

        public CustomQueryBuilder Join(CustomQueryColumn column)
        {
            if (string.IsNullOrEmpty(column.TableName))
                column.TableName = _tableName;

            if (string.IsNullOrEmpty(column.TableAlias) && !string.IsNullOrEmpty(_tableAlias))
                column.TableAlias = _tableAlias;

            _joinClauseBuilder.Join(column);

            return this;
        }

        public CustomQueryBuilder Where(WhereClause whereClause)
        {
            if (string.IsNullOrEmpty(whereClause.TableAlias) && !string.IsNullOrEmpty(_tableAlias))
                whereClause.TableAlias = _tableAlias;

            _whereClauseBuilder.Where(whereClause);
            return this;
        }

        public string Build()
        {
            _customQueryBuilder
                .Append(_selectClauseBuilder.Build())
                .AppendLine()
                .Append(_joinClauseBuilder.Build())
                .AppendLine()
                .Append(_whereClauseBuilder.Build());

            return _customQueryBuilder.ToString();
        }
    }
}
