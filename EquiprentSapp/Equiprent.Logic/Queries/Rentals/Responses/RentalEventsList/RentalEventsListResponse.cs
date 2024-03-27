using Equiprent.Entities.Business.Rentals;
using Equiprent.Logic.Abstractions;
using System.Linq.Expressions;
using System.Threading;

namespace Equiprent.Logic.Queries.Rentals.Responses.RentalEventsList
{
    public class RentalEventsListResponse : ListViewModelBaseResponse<Rental, RentalAsEventDto, RentalAsEventListItemViewModel>
    {
        private static new readonly Expression<Func<Rental, RentalAsEventDto>> _selector = entity => new RentalAsEventDto
        {
            End = entity.End,
            Id = entity.Id,
            Start = entity.Start,
        };

        public RentalEventsListResponse(
            RequestParameters requestParameters,
            IQueryable<Rental> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider, _selector)
        {
        }

        protected override async Task<RentalAsEventListItemViewModel> MapEntityToViewModelAsync(RentalAsEventDto entity, CancellationToken cancellationToken = default)
        {
            return await Task.FromResult(new RentalAsEventListItemViewModel
            {
                End = entity.End,
                Id = entity.Id,
                Start = entity.Start,
            });
        }
    }
}
