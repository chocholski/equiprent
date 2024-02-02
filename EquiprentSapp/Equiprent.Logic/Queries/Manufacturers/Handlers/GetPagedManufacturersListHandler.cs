using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Manufacturers;
using Equiprent.Logic.Queries.Manufacturers.Requests;
using Equiprent.Logic.Queries.Manufacturers.Responses.PagedManufacturersList;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Manufacturers.Handlers
{
    public class GetPagedManufacturersListHandler : IRequestHandler<GetPagedManufacturersListRequest, PagedManufacturersListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedManufacturersListHandler(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
        }

        public async Task<PagedManufacturersListResponse?> Handle(GetPagedManufacturersListRequest request, CancellationToken cancellationToken = default)
        {
            return await ListViewResponseBuilder.GetListViewResponseAsync<PagedManufacturersListResponse, Manufacturer, ManufacturerListItemViewModel>(
                requestParameters: request.RequestParameters,
                query: GetManufacturersQuery(),
                _serviceProvider,
                cancellationToken);
        }

        private IQueryable<Manufacturer> GetManufacturersQuery()
        {
            return _dbContext.Manufacturers
                .Include(m => m.Address)
                .ThenInclude(a => a.Country);
        }
    }
}
