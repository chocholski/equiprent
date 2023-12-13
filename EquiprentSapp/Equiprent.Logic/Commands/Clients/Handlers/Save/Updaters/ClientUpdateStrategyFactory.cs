using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.Strategies;
using Equiprent.Logic.Commands.Clients.Requests.Save;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters
{
    internal class ClientUpdateStrategyFactory
    {
        private readonly ApplicationDbContext _dbContext;

        public ClientUpdateStrategyFactory(ApplicationDbContext dbContext)
        { 
            _dbContext = dbContext;
        }

        public IClientUpdateStrategy GetClientUpdateStrategy(Client client, SaveRequest updatingRequest)
        {
            if (client.ClientTypeId != updatingRequest.TypeId)
            {
                return new UpdateClientWithTypeChangeStrategy(_dbContext);
            }
            else
            {
                return new UpdateClientWithoutTypeChangeStrategy(_dbContext);
            }
        }
    }
}
