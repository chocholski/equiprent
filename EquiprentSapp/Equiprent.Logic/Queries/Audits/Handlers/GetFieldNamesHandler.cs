using Equiprent.Data.CustomQueries.Audits;
using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Audits.Reponses.FieldNames;
using Equiprent.Logic.Queries.Audits.Requests;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Audits.Handlers
{
    public class GetFieldNamesHandler : IQueryHandler<GetFieldNamesRequest, FieldNamesResponse>
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

        public async Task<FieldNamesResponse?> HandleAsync(GetFieldNamesRequest request)
        {
            return await ListViewResponseBuilder.GetListViewResponseAsync<FieldNamesResponse, AuditListQueryModel, FieldNamesItemViewModel>(
                requestParameters: request.RequestParameters,
                query: GetAuditFieldNamesQueryUsingRequest(request),
                _serviceProvider);
        }

        private IQueryable<AuditListQueryModel> GetAuditFieldNamesQueryUsingRequest(GetFieldNamesRequest request)
        {
            return _dbContext!.AuditListItems
                .FromSqlRaw(AuditQueries.GetAuditQuery(request.EntityId, request.EntityTableName));
        }
    }
}
