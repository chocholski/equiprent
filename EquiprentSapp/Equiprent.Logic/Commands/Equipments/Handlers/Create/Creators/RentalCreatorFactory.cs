using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Equipments.Handlers.Create.Creators.RentalCreator;
using Equiprent.Logic.Commands.Rentals.Requests.Create;

namespace Equiprent.Logic.Commands.Equipments.Handlers.Create.Creators
{
    internal sealed class RentalCreatorFactory
    {
        private readonly CreateRequest _request;

        public RentalCreatorFactory(CreateRequest request)
        {
            _request = request;
        }

        public IRentalCreator GetRentalCreator()
        {
            return _request.CategoryId switch
            {
                (int)RentalCategoryEnum.Lease => new LeaseRentalCreator(_request),
                (int)RentalCategoryEnum.Sublease => new SubleaseRentalCreator(_request),
                (int)RentalCategoryEnum.RentToOwn => new RentToOwnRentalCreator(_request),
                _ => throw new Exception($"Unsupported type of client typeId: {_request.CategoryId}")
            };
        }
    }
}
