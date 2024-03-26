using Equiprent.Entities.Business.Rentals;

namespace Equiprent.Logic.Commands.Equipments.Handlers.Create.Creators.RentalCreator
{
    internal interface IRentalCreator
    {
        Rental CreateRental();
    }
}
