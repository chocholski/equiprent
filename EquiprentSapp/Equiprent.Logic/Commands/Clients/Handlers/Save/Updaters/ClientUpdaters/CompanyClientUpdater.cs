using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Extensions;
using Equiprent.Logic.Commands.Clients.Requests.Save;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.UpdateStates
{
    internal class CompanyClientUpdater : IClientUpdater
    {
        private readonly ApplicationDbContext _dbContext;

        public CompanyClientUpdater(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Client? UpdateClientWithoutTypeChangingRequest(Client client, SaveRequest updatingRequest)
        {
            var companyClient = (CompanyClient)client;
            UpdateStandardCompanyClientPropertiesWithRequest(companyClient, updatingRequest);
            return companyClient;
        }

        public async Task<Client?> UpdateClientWithTypeChangingRequestAsync(Client client, SaveRequest updatingRequest, CancellationToken cancellationToken = default)
        {
            CompanyClient companyClient;

            if (client is PrivateClient privateClient)
            {
                companyClient = privateClient.Clone<CompanyClient>();
                _dbContext.PrivateClients.Remove(privateClient);
            }
            else
            {
                throw new Exception($"Unsupported client type: {client.GetType()}");
            }

            UpdateStandardCompanyClientPropertiesWithRequest(companyClient, updatingRequest);
            _dbContext.CompanyClients.Add(companyClient);

            return await Task.FromResult(companyClient);
        }

        private static void UpdateStandardCompanyClientPropertiesWithRequest(CompanyClient companyClient, SaveRequest updatingRequest)
        {
            companyClient.ClientTypeId = updatingRequest.TypeId;
            companyClient.Name = updatingRequest.Name;
        }
    }
}
