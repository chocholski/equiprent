using Equiprent.Data.CustomQueries.Queries.Audits.Requests;
using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Audits.Reponses.ObjectHistory;
using Equiprent.Logic.Queries.Audits.Requests;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Threading;

namespace Equiprent.Logic.Queries.Audits.Handlers
{
    public class GetObjectHistoryHandler : IRequestHandler<GetObjectHistoryRequest, ObjectHistoryResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IServiceProvider _serviceProvider;

        public GetObjectHistoryHandler(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
            _mediator = serviceProvider.GetRequiredService<IMediator>();
        }

        public async Task<ObjectHistoryResponse?> Handle(GetObjectHistoryRequest request, CancellationToken cancellationToken)
        {
            return await ListViewResponseBuilder.GetListViewResponseAsync<ObjectHistoryResponse, AuditListQueryModel, AuditListQueryModel, ObjectHistoryItemViewModel>(
                requestParameters: request.RequestParameters,
                query: await GetObjectHistoryQueryWithRequestAsync(request),
                _serviceProvider,
                cancellationToken);
        }

        private async Task<IQueryable<AuditListQueryModel>> GetObjectHistoryQueryWithRequestAsync(GetObjectHistoryRequest request)
        {
            return _dbContext.AuditListItems
                .FromSqlRaw(await _mediator.Send(new GetAuditQueryRequest(_dbContext, request.EntityId, request.EntityTableName)));
        }
    }
}
