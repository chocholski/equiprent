using Equiprent.Data.CustomQueries.Audits;
using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Audits.Reponses.ObjectHistory;
using Equiprent.Logic.Queries.Audits.Requests;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Audits.Handlers
{
    public class GetObjectHistoryHandler : IRequestHandler<GetObjectHistoryRequest, ObjectHistoryResponse?>
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

        public async Task<ObjectHistoryResponse?> Handle(GetObjectHistoryRequest request, CancellationToken cancellationToken)
        {
            return await ListViewResponseBuilder.GetListViewResponseAsync<ObjectHistoryResponse, AuditListQueryModel, AuditListQueryModel, ObjectHistoryItemViewModel>(
                requestParameters: request.RequestParameters,
                query: GetObjectHistoryQueryWithRequest(request),
                _serviceProvider,
                cancellationToken);
        }

        private IQueryable<AuditListQueryModel> GetObjectHistoryQueryWithRequest(GetObjectHistoryRequest request)
        {
            return _dbContext.AuditListItems
                .FromSqlRaw(AuditQueries.GetAuditQuery(request.EntityId, request.EntityTableName));
        }
    }
}
