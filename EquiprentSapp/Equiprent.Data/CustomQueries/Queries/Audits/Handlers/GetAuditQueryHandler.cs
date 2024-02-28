using Equiprent.Data.CustomQueries.Builders.Join;
using Equiprent.Data.CustomQueries.Builders.Where;
using Equiprent.Data.CustomQueries.Builders;
using Equiprent.Data.CustomQueries.Queries.Audits.Requests;
using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.Audits;
using Equiprent.Entities.Application.Users;
using MediatR;
using System.Threading;

namespace Equiprent.Data.CustomQueries.Queries.Audits.Handlers
{
    public class GetAuditQueryHandler : IRequestHandler<GetAuditQueryRequest, string>
    {
        public async Task<string> Handle(GetAuditQueryRequest request, CancellationToken cancellationToken)
        {
            var auditTableName = nameof(ApplicationDbContext.Audits);
            var auditTableAlias = "a";
            var userTableName = nameof(ApplicationDbContext.Users);
            var baseAuditTableColumn = new CustomQueryColumn(nameof(Audit.CreatedOn));
            var baseUserTableJoinColumn = new CustomQueryColumn(nameof(Audit.CreatedById)) with
            {
                JoinedForeignKey = nameof(Audit.CreatedById),
                JoinedTable = new JoinedTable(
                    Name: userTableName,
                    ColumnKey: nameof(User.Id),
                    ColumnName: nameof(User.Login),
                    JoinType: JoinTypeEnum.Inner) with
                {
                    ColumnAlias = nameof(AuditListQueryModel.UserName),
                    TableAlias = "u"
                }
            };

            var query = new CustomQueryBuilder(request.DbContext, tableName: auditTableName, tableAlias: auditTableAlias)
                .AddSelectColumnWithJoin(baseUserTableJoinColumn)
                .AddSelectColumn(baseAuditTableColumn)
                .AddSelectColumn(baseAuditTableColumn with { ColumnName = nameof(Audit.FieldName) })
                .AddSelectColumn(baseAuditTableColumn with { ColumnName = nameof(Audit.OldValue) })
                .AddSelectColumn(baseAuditTableColumn with { ColumnName = nameof(Audit.NewValue) })
                .Where(new WhereClause(
                    auditTableName,
                    nameof(Audit.TableName),
                    WhereOuterLogicalOperatorEnum.And,
                    WhereOperatorEnum.Equals,
                    Condition: $"\'{request.TableName}\'")
                with
                {
                    TableAlias = auditTableAlias
                })
                .Where(new WhereClause(
                    auditTableName,
                    nameof(Audit.KeyValue),
                    WhereOuterLogicalOperatorEnum.And,
                    WhereOperatorEnum.Equals,
                    Condition: $"\'{request.Id}\'")
                with
                {
                    TableAlias = auditTableAlias
                })
                .Build();

            return await Task.FromResult(query);
        }
    }
}
