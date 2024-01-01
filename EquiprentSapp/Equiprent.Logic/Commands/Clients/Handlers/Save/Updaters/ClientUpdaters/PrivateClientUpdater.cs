using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Entities.Business.Clients;
using Equiprent.Extensions;
using Equiprent.Logic.Commands.Clients.Requests.Save;
using System.Threading;

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

        public async Task<Client?> UpdateClientWithTypeChangingRequestAsync(Client client, SaveRequest updatingRequest, CancellationToken cancellationToken = default)
        {
            PrivateClient privateClient;

            if (client is CompanyClient companyClient)
            {
                privateClient = companyClient.Clone<PrivateClient>();
                await RemoveCompanyClientRepresentativesAsync(companyClient, cancellationToken);
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

        private async Task RemoveCompanyClientRepresentativesAsync(CompanyClient client, CancellationToken cancellationToken = default)
        {
            var clientRepresentatives = await _dbContext.ClientRepresentatives
                .Where(representative => representative.ClientId == client.Id)
                .ToListAsync(cancellationToken);

            if (!clientRepresentatives.IsNullOrEmpty())
            {
                await RemoveClientRepresentativesAddressesAsync(clientRepresentatives, cancellationToken);
                
                foreach (var representative in clientRepresentatives)
                    _dbContext.ClientRepresentatives.Remove(representative);
            }
        }

        private async Task RemoveClientRepresentativesAddressesAsync(List<ClientRepresentative> clientRepresentatives, CancellationToken cancellationToken = default)
        {
            var clientRepresentativesAddresses = await _dbContext.Addresses
                .Where(a => clientRepresentatives.Select(representative => representative.AddressId).Contains(a.Id))
                .ToListAsync();

            _dbContext.Addresses.RemoveRange(clientRepresentativesAddresses);
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
