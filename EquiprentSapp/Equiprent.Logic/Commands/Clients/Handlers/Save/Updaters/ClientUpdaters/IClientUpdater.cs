using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Requests.Save;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.UpdateStates
{
    internal interface IClientUpdater
    {
        Task<Client?> UpdateClientWithTypeChangingRequestAsync(Client client, SaveRequest updatingRequest, CancellationToken cancellationToken = default);
        Client? UpdateClientWithoutTypeChangingRequest(Client client, SaveRequest updatingRequest);
    }
}
