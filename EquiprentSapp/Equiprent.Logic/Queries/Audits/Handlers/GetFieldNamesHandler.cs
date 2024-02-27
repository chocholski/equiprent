using Equiprent.Data.CustomQueries.Queries.Audits;
using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Audits.Reponses.FieldNames;
using Equiprent.Logic.Queries.Audits.Requests;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Audits.Handlers
{
    public class GetFieldNamesHandler : IRequestHandler<GetFieldNamesRequest, FieldNamesResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IServiceProvider _serviceProvider;

        public GetFieldNamesHandler(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
        }

        public async Task<FieldNamesResponse?> Handle(GetFieldNamesRequest request, CancellationToken cancellationToken)
        {
            return await ListViewResponseBuilder.GetListViewResponseAsync<FieldNamesResponse, AuditListQueryModel, AuditListQueryModel, FieldNamesItemViewModel>(
                requestParameters: request.RequestParameters,
                query: GetAuditFieldNamesQueryWithRequest(request),
                _serviceProvider,
                cancellationToken);
        }

        private IQueryable<AuditListQueryModel> GetAuditFieldNamesQueryWithRequest(GetFieldNamesRequest request)
        {
            return _dbContext.AuditListItems
                .FromSqlRaw(AuditQueries.GetAuditQuery(request.EntityId, request.EntityTableName));
        }
    }
}
