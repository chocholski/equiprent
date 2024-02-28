using Equiprent.Data.CustomQueries.Queries.Audits.Requests;
using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Audits.Reponses.FieldNames;
using Equiprent.Logic.Queries.Audits.Requests;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Threading;

namespace Equiprent.Logic.Queries.Audits.Handlers
{
    public class GetFieldNamesHandler : IRequestHandler<GetFieldNamesRequest, FieldNamesResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMediator _mediator;
        private readonly IServiceProvider _serviceProvider;

        public GetFieldNamesHandler(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
            _mediator = serviceProvider.GetRequiredService<IMediator>();
        }

        public async Task<FieldNamesResponse?> Handle(GetFieldNamesRequest request, CancellationToken cancellationToken)
        {
            return await ListViewResponseBuilder.GetListViewResponseAsync<FieldNamesResponse, AuditListQueryModel, AuditListQueryModel, FieldNamesItemViewModel>(
                requestParameters: request.RequestParameters,
                query: await GetAuditFieldNamesQueryWithRequestAsync(request),
                _serviceProvider,
                cancellationToken);
        }

        private async Task<IQueryable<AuditListQueryModel>> GetAuditFieldNamesQueryWithRequestAsync(GetFieldNamesRequest request)
        {
            return _dbContext.AuditListItems
                .FromSqlRaw(await _mediator.Send(new GetAuditQueryRequest(_dbContext, request.EntityId, request.EntityTableName)));
        }
    }
}
