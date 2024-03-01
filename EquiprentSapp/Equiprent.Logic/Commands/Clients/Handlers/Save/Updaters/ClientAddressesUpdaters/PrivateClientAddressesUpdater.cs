using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.Clients.Addresses;
using Equiprent.Logic.Commands.Clients.Requests.Save;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.ClientAddressesUpdaters
{
    internal class PrivateClientAddressesUpdater : ClientAddressesUpdater
    {
        public PrivateClientAddressesUpdater(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async override Task<bool> UpdateClientAddressesWithoutTypeChangingRequestAsync(Client client, SaveRequest updatingRequest, CancellationToken cancellationToken = default)
        {
            var privateClient = (PrivateClient)client;

            foreach (var addressFromRequest in updatingRequest.Addresses)
            {
                var privateClientAddress = await _dbContext.PrivateClientAddresses
                    .Include(clientAddress => clientAddress.PrivateClient)
                    .SingleOrDefaultAsync(clientAddress =>
                        !clientAddress.PrivateClient.IsDeleted &&
                        clientAddress.PrivateClientId == privateClient.Id &&
                        clientAddress.AddressId == addressFromRequest.Id,
                        cancellationToken);

                if (privateClientAddress is null)
                    return false;

                UpdateAddressWithRequest(privateClientAddress.Address, addressFromRequest);
            }

            return true;
        }

        public async override Task<bool> UpdateClientAddressesWithTypeChangingRequestAsync(Client client, Client updatedClient, SaveRequest updatingRequest, CancellationToken cancellationToken = default)
        {
            if (client is CompanyClient companyClient)
            {
                await RemoveOldCompanyClientAddressesAsync(companyClient, cancellationToken);
            }
            else
            {
                throw new Exception($"Unsupported client type: {client.GetType()}");
            }

            CreatePrivateClientAddressesWithRequest(updatedClient, updatingRequest);

            return true;
        }

        private void CreatePrivateClientAddressesWithRequest(Client client, SaveRequest updatingRequest)
        {
            var privateClient = (PrivateClient)client;
            foreach (var addressFromRequest in updatingRequest.Addresses)
            {
                var address = CreateAddress(addressFromRequest);
                _dbContext.Addresses.Add(address);
                _dbContext.PrivateClientAddresses.Add(new PrivateClientAddress
                {
                    PrivateClient = privateClient,
                    Address = address,
                    NationalCitizenId = addressFromRequest.NationalId
                });
            }
        }

        private async Task RemoveOldCompanyClientAddressesAsync(CompanyClient companyClient, CancellationToken cancellationToken = default)
        {
            var clientAddressesToRemove = await _dbContext.CompanyClientAddresses
                .Where(clientAddress => clientAddress.CompanyClientId == companyClient.Id)
                .ToListAsync(cancellationToken);

            _dbContext.CompanyClientAddresses.RemoveRange(clientAddressesToRemove);

            var addressesToRemoveIds = clientAddressesToRemove
                .Select(clientAddress => clientAddress.AddressId);

            await RemoveOldAddressesAsync(addressesToRemoveIds, cancellationToken);
        }
    }
}
