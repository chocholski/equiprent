using Equiprent.Data.CustomQueries.Equipments;
using Equiprent.Data.CustomQueryTypes.Equipments;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsList;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Handlers
{
    public class GetPagedEquipmentsListHandler : IRequestHandler<GetPagedEquipmentsListRequest, PagedEquipmentsListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedEquipmentsListHandler(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
        }

        public async Task<PagedEquipmentsListResponse?> Handle(GetPagedEquipmentsListRequest request, CancellationToken cancellationToken = default)
        {
            return await ListViewResponseBuilder.GetListViewResponseAsync<PagedEquipmentsListResponse, EquipmentListQueryModel, EquipmentListItemViewModel>(
                requestParameters: request.RequestParameters,
                query: GetEquipmentsQuery(),
                _serviceProvider,
                cancellationToken);
        }

        private IQueryable<EquipmentListQueryModel> GetEquipmentsQuery()
        {
            return _dbContext.EquipmentListItems
                .FromSqlRaw(EquipmentQueries.GetEquipmentsQuery());
        }
    }
}
