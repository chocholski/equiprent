using Equiprent.ApplicationImplementations.Database.CustomQueries.Join;
using Equiprent.ApplicationImplementations.Database.CustomQueries.Select;
using Equiprent.ApplicationImplementations.Database.CustomQueries.Where;
using Equiprent.Data.DbContext;
using System.Text;

namespace Equiprent.ApplicationImplementations.Database.CustomQueries
{
    public class CustomQueryBuilder
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly StringBuilder _customQueryBuilder = new();
        private readonly JoinClauseBuilder _joinClauseBuilder;
        private readonly SelectClauseBuilder _selectClauseBuilder;
        private readonly WhereClauseBuilder _whereClauseBuilder;

        public CustomQueryBuilder(ApplicationDbContext dbContext, string tableName)
        {
            _dbContext = dbContext;
            _joinClauseBuilder = new JoinClauseBuilder(_dbContext);
            _selectClauseBuilder = new SelectClauseBuilder(_dbContext, from: tableName);
            _whereClauseBuilder = new WhereClauseBuilder(_dbContext);
        }

        public CustomQueryBuilder AddSelectColumn(CustomQueryColumn column)
        {
            _selectClauseBuilder.AddColumn(column);
            return this;
        }

        public CustomQueryBuilder AddSelectColumnWithJoin(CustomQueryColumn column)
        {
            AddSelectColumn(column);

            if (JoinClauseBuilder.IsJoinedColumn(column))
                Join(column);

            return this;
        }

        public CustomQueryBuilder Join(CustomQueryColumn column)
        {
            _joinClauseBuilder.Join(column);
            return this;
        }

        public CustomQueryBuilder Where(WhereClause whereClause)
        {
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
                .Append(_whereClauseBuilder.Build())
                .Append(';');

            return _customQueryBuilder.ToString();
        }
    }
}
