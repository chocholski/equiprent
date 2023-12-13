using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Extensions;
using Equiprent.Logic.Commands.Clients.Requests.Save;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.UpdateStates
{
    internal class PrivateClientUpdater : IClientUpdater
    {
        private readonly ApplicationDbContext _dbContext;

        public PrivateClientUpdater(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Client? UpdateClientWithoutTypeChangingRequest(Client client, SaveRequest updatingRequest)
        {
            var privateClient = (PrivateClient)client;

            UpdateStandardPrivateClientPropertiesWithRequest(privateClient, updatingRequest);
            _dbContext.PrivateClients.Update(privateClient);

            return privateClient;
        }

        public Client? UpdateClientWithTypeChangingRequest(Client client, SaveRequest updatingRequest)
        {
            PrivateClient privateClient;

            if (client is CompanyClient companyClient)
            {
                privateClient = companyClient.Clone<PrivateClient>();
                _dbContext.CompanyClients.Remove(companyClient);
            }
            else
            {
                throw new Exception($"Unsupported client type: {client.GetType()}");
            }

            UpdateStandardPrivateClientPropertiesWithRequest(privateClient, updatingRequest);
            _dbContext.PrivateClients.Add(privateClient);

            return privateClient;
        }

        private static void UpdateStandardPrivateClientPropertiesWithRequest(PrivateClient privateClient, SaveRequest updatingRequest)
        {
            privateClient.ClientTypeId = updatingRequest.TypeId;
            privateClient.FirstName = updatingRequest.FirstName!;
            privateClient.LastName = updatingRequest.LastName!;
            privateClient.Name = updatingRequest.Name;
        }
    }
}
