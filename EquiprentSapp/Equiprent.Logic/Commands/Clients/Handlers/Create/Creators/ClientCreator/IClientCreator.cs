using Equiprent.Entities.Business.Clients;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientCreator
{
    internal interface IClientCreator
    {
        Client CreateClient();
        void CreateClientAddresses(Client client);
    }
}
