using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Requests.Save;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.Strategies
{
    internal interface IClientUpdateStrategy
    {
        Task<Client?> UpdateClientWithRequestAsync(Client client, SaveRequest updatingRequest, CancellationToken cancellationToken = default);
        Task<bool> UpdateClientAddressesWithRequestAsync(Client client, Client updatedClient, SaveRequest updatingRequest, CancellationToken cancellationToken = default);
    }
}
