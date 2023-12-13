using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Requests.Create;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientAddressesCreators
{
    internal abstract class ClientAddressesCreator
    {
        protected readonly ApplicationDbContext _dbContext;

        public ClientAddressesCreator(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public abstract void CreateClientAddressesWithRequest(Client client, CreateRequest creatingRequest);
    }
}
