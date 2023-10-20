using Equiprent.Data.CustomQueries;
using Equiprent.Data.CustomQueryTypes;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Audits.Reponses.ObjectHistory;
using Equiprent.Logic.Queries.Audits.Requests;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Audits.Handlers
{
    public class GetObjectHistoryHandler : IQueryHandler<GetObjectHistoryRequest, ObjectHistoryResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IServiceProvider _serviceProvider;

        public GetObjectHistoryHandler(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
        }

        public async Task<ObjectHistoryResponse?> HandleAsync(GetObjectHistoryRequest request)
        {
            return await ListViewResponseBuilder.GetListViewResponseAsync<ObjectHistoryResponse, AuditListQueryModel, ObjectHistoryItemViewModel>(
                requestParameters: request.RequestParameters,
                query: _dbContext!.AuditListItems.FromSqlRaw(AuditQueries.GetAudit(request.EntityId, request.EntityTableName)),
                _serviceProvider);
        }
    }
}
