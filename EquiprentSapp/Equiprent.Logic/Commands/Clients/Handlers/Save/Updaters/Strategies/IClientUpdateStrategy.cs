using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Requests.Save;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.Strategies
{
    internal interface IClientUpdateStrategy
    {
        Client? UpdateClientWithRequest(Client client, SaveRequest updatingRequest);
        Task<bool> UpdateClientAddressesWithRequestAsync(Client client, Client updatedClient, SaveRequest updatingRequest);
    }
}
