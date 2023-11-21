using Equiprent.Data.CustomQueries.Audits;
using Equiprent.Data.CustomQueryTypes.Audits;
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
                query: GetObjectHistoryQueryUsingRequest(request),
                _serviceProvider);
        }

        private IQueryable<AuditListQueryModel> GetObjectHistoryQueryUsingRequest(GetObjectHistoryRequest request)
        {
            return _dbContext.AuditListItems
                .FromSqlRaw(AuditQueries.GetAuditQuery(request.EntityId, request.EntityTableName));
        }
    }
}
