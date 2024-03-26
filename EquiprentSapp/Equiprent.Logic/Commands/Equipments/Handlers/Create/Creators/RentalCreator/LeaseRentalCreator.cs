using Equiprent.Entities.Business.Rentals;
using Equiprent.Logic.Commands.Rentals.Requests.Create;

namespace Equiprent.Logic.Commands.Equipments.Handlers.Create.Creators.RentalCreator
{
    internal sealed class LeaseRentalCreator : IRentalCreator
    {
        private readonly CreateRequest _request;

        public LeaseRentalCreator(CreateRequest request)
        {
            _request = request;
        }

        public Rental CreateRental()
        {
            return new LeaseRental
            {
                CategoryId = _request.CategoryId,
                CreatedById = _request.CreatedById,
                CreatedOn = DateTime.Now,
                End = _request.End,
                EquipmentId = _request.EquipmentId,
                Number = string.Empty,
                RenterId = _request.RenterId,
                RentierId = _request.RentierId,
                Start = _request.Start,
                UserResponsibleForHandlingId = _request.UserResponsibleForHandlingId
            };
        }
    }
}
