using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Compositions;
using Equiprent.Logic.Commands.Clients.Requests.Create;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientCreator
{
    internal interface IClientCreator
    {
        Client? CreateClientWithRequest(CreateRequestWithCreatorId creatingRequest);
        void CreateClientAddressesWithRequest(Client client, CreateRequest creatingRequest);
    }
}
