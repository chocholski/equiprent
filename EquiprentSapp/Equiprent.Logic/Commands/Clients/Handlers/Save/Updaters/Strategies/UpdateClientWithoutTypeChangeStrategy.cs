using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.ClientAddressesUpdaters;
using Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.UpdateStates;
using Equiprent.Logic.Commands.Clients.Requests.Save;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.Strategies
{
    internal class UpdateClientWithoutTypeChangeStrategy : IClientUpdateStrategy
    {
        private readonly ApplicationDbContext _dbContext;

        public UpdateClientWithoutTypeChangeStrategy(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> UpdateClientAddressesWithRequestAsync(Client client, Client updatedClient, SaveRequest updatingRequest)
        {
            if (updatingRequest.TypeId == (int)ClientTypeEnum.Private)
            {
                return await new PrivateClientAddressesUpdater(_dbContext)
                    .UpdateClientAddressesWithoutTypeChangingRequestAsync(client, updatingRequest);
            }
            else if (updatingRequest.TypeId == (int)ClientTypeEnum.Company)
            {
                return await new CompanyClientAddressesUpdater(_dbContext)
                    .UpdateClientAddressesWithoutTypeChangingRequestAsync(client, updatingRequest);
            }
            else
            {
                throw new Exception($"Unsupported type of client: {client.GetType()}");
            }
        }

        public async Task<Client?> UpdateClientWithRequestAsync(Client client, SaveRequest updatingRequest)
        {
            if (updatingRequest.TypeId == (int)ClientTypeEnum.Private)
            {
                return new PrivateClientUpdater(_dbContext)
                    .UpdateClientWithoutTypeChangingRequest(client, updatingRequest);
            }
            else if (updatingRequest.TypeId == (int)ClientTypeEnum.Company)
            {
                return await new CompanyClientUpdater(_dbContext)
                    .UpdateClientWithTypeChangingRequestAsync(client, updatingRequest);
            }
            else
            {
                throw new Exception($"Unsupported type of client: {client.GetType()}");
            }
        }
    }
}
