using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Rentals;
using Equiprent.Logic.Queries.Rentals.Requests;
using Equiprent.Logic.Queries.Rentals.Responses.RentalEventsList;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Rentals.Handlers.RentalEventsList
{
    public class GetRentalEventsListHandler : IRequestHandler<GetRentalEventsListRequest, RentalEventsListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IServiceProvider _serviceProvider;

        public GetRentalEventsListHandler(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
        }

        public async Task<RentalEventsListResponse?> Handle(GetRentalEventsListRequest request, CancellationToken cancellationToken)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<RentalEventsListResponse, Rental, RentalAsEventDto, RentalAsEventListItemViewModel>(
                requestParameters: new RequestParameters(),
                query: GetRentalEventsQueryWithRequest(request),
                _serviceProvider,
                cancellationToken);

            return response;
        }

        private IQueryable<Rental> GetRentalEventsQueryWithRequest(GetRentalEventsListRequest request)
        {
            var monthBeginning = new DateTime(request.Year, request.Month, 1);
            var monthEnd = new DateTime(request.Year, request.Month, DateTime.DaysInMonth(request.Year, request.Month));
            return _dbContext.Rentals
                .Where(r =>
                    !r.IsDeleted &&
                    r.EquipmentId == request.EquipmentId &&
                    (
                        (
                            r.Start >= monthBeginning &&
                            r.Start <= monthEnd
                        ) ||
                        (
                            r.End >= monthBeginning &&
                            r.End <= monthEnd
                        )
                    ));
        }
    }
}
