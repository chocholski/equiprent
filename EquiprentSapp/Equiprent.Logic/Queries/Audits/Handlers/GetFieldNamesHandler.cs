using Equiprent.ApplicationServices.Database;
using Equiprent.Data.CustomQueries;
using Equiprent.Data.CustomQueryTypes;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Audits.Reponses.FieldNames;
using Equiprent.Logic.Queries.Audits.Requests;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Audits.Handlers
{
    public class GetFieldNamesHandler : IQueryHandler<GetFieldNamesRequest, FieldNamesResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IDbStatementService _dbStatementService;

        public GetFieldNamesHandler(
            ApplicationDbContext dbContext,
            IDbStatementService dbStatementService)
        {
            _dbContext = dbContext;
            _dbStatementService = dbStatementService;
        }

        public async Task<FieldNamesResponse?> HandleAsync(GetFieldNamesRequest request)
        {
            return await ListViewResponseBuilder.GetListViewResponseAsync<FieldNamesResponse, AuditListQueryModel, FieldNamesItemViewModel>(
                requestParameters: request.RequestParameters,
                _dbStatementService,
                query: _dbContext!.AuditListItems.FromSqlRaw(AuditQueries.GetAudit(request.EntityId, request.EntityTableName)));
        }
    }
}
