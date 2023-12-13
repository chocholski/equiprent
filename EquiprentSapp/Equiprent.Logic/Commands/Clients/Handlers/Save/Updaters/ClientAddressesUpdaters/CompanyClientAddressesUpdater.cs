using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.ClientAddresses;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Requests.Save;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.ClientAddressesUpdaters
{
    internal class CompanyClientAddressesUpdater : ClientAddressesUpdater
    {
        public CompanyClientAddressesUpdater(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async override Task<bool> UpdateClientAddressesWithoutTypeChangingRequestAsync(Client client, SaveRequest updatingRequest)
        {
            var companyClient = (CompanyClient)client;

            foreach (var addressFromRequest in updatingRequest.Addresses)
            {
                var companyClientAddress = await _dbContext.CompanyClientAddresses
                    .Include(clientAddress => clientAddress.CompanyClient)
                    .SingleOrDefaultAsync(clientAddress =>
                        !clientAddress.CompanyClient.IsDeleted &&
                        clientAddress.CompanyClientId == companyClient.Id &&
                        clientAddress.AddressId == addressFromRequest.Id);

                if (companyClientAddress is null)
                    return false;

                UpdateAddressWithRequest(companyClientAddress.Address, addressFromRequest);
            }

            return true;
        }

        public async override Task<bool> UpdateClientAddressesWithTypeChangingRequestAsync(Client client, Client updatedClient, SaveRequest updatingRequest)
        {
            if (client is PrivateClient privateClient)
            {
                await RemoveOldPrivateClientAddressesAsync(privateClient);
            }
            else
            {
                throw new Exception($"Unsupported client type: {client.GetType()}");
            }

            CreateCompanyClientAddressesWithRequest(updatedClient, updatingRequest);

            return true;
        }

        private void CreateCompanyClientAddressesWithRequest(Client client, SaveRequest updatingRequest)
        {
            var companyClient = (CompanyClient)client;
            foreach (var addressFromRequest in updatingRequest.Addresses)
            {
                var address = CreateAddress(addressFromRequest);
                _dbContext.Addresses.Add(address);
                _dbContext.CompanyClientAddresses.Add(new CompanyClientAddress
                {
                    CompanyClient = companyClient,
                    Address = address,
                    NationalCompanyId = addressFromRequest.NationalId
                });
            }
        }

        private async Task RemoveOldPrivateClientAddressesAsync(PrivateClient privateClient)
        {
            var clientAddressesToRemove = await _dbContext.PrivateClientAddresses
                .Where(clientAddress => clientAddress.PrivateClientId == privateClient.Id)
                .ToListAsync();

            _dbContext.PrivateClientAddresses.RemoveRange(clientAddressesToRemove);

            var addressesToRemoveIds = clientAddressesToRemove
                .Select(clientAddress => clientAddress.AddressId);

            await RemoveOldAddressesAsync(addressesToRemoveIds);
        }
    }
}
