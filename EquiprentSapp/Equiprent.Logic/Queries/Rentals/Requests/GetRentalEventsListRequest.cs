using Equiprent.Logic.Queries.Rentals.Responses.RentalEventsList;
using MediatR;

namespace Equiprent.Logic.Queries.Rentals.Requests
{
    public class GetRentalEventsListRequest : IRequest<RentalEventsListResponse?>
    {
        public Guid EquipmentId { get; init; }

        public int Year { get; init; }

        public int Month { get; init; }

        public GetRentalEventsListRequest(Guid equipmentId, int year, int month)
        {
            EquipmentId = equipmentId;
            Year = year;
            Month = month;
        }
    }
}
