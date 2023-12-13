using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.Addresses;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Addresses.Models;
using Equiprent.Logic.Commands.Clients.Requests.Save;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters.ClientAddressesUpdaters
{
    internal abstract class ClientAddressesUpdater
    {
        protected readonly ApplicationDbContext _dbContext;

        public ClientAddressesUpdater(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public abstract Task<bool> UpdateClientAddressesWithoutTypeChangingRequestAsync(Client client, SaveRequest updatingRequest);
        public abstract Task<bool> UpdateClientAddressesWithTypeChangingRequestAsync(Client client, Client updatedClient, SaveRequest updatingRequest);

        protected static Address CreateAddress(AddressModel model)
        {
            return AddressModel.CreateAddressFromModel(model);
        }

        protected async Task RemoveOldAddressesAsync(IEnumerable<int> addressesToRemoveIds)
        {
            var addressesToRemove = await _dbContext.Addresses
                .Where(a => addressesToRemoveIds.Contains(a.Id))
                .ToListAsync();

            _dbContext.Addresses.RemoveRange(addressesToRemove);
        }

        protected void UpdateAddressWithRequest(Address address, AddressModel modelFromRequest)
        {
            address.ApartmentNumber = modelFromRequest.ApartmentNumber;
            address.City = modelFromRequest.City;
            address.CountryId = modelFromRequest.CountryId;
            address.Email = modelFromRequest.Email;
            address.PhoneNumber = modelFromRequest.PhoneNumber;
            address.PostalCode = modelFromRequest.PostalCode;
            address.StreetName = modelFromRequest.StreetName;
            address.StreetNumber = modelFromRequest.StreetNumber;

            _dbContext.Addresses.Update(address);
        }
    }
}
