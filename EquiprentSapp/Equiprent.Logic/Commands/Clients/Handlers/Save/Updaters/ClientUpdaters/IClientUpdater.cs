using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Requests.Save;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.UpdateStates
{
    internal interface IClientUpdater
    {
        Task<Client?> UpdateClientWithTypeChangingRequestAsync(Client client, SaveRequest updatingRequest);
        Client? UpdateClientWithoutTypeChangingRequest(Client client, SaveRequest updatingRequest);
    }
}
