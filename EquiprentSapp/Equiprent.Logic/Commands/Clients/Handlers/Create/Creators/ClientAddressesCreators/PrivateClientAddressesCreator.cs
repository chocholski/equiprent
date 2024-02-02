using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.ClientAddresses;
using Equiprent.Entities.Business.Clients;
using Equiprent.Extensions;
using Equiprent.Logic.Commands.Clients.Requests.Create;
using Equiprent.Logic.GeneralModels;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientAddressesCreators
{
    internal class PrivateClientAddressesCreator : ClientAddressesCreator
    {
        public PrivateClientAddressesCreator(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public override void CreateClientAddressesWithRequest(Client client, CreateRequest creatingRequest)
        {
            var clientAddresses = new List<PrivateClientAddress>();
            foreach (var requestAddress in creatingRequest.Addresses)
            {
                var address = AddressModel.CreateAddressFromModel(requestAddress);
                _dbContext.Addresses.Add(address);

                clientAddresses.Add(new PrivateClientAddress
                {
                    PrivateClient = client,
                    Address = address,
                    NationalCitizenId = requestAddress.NationalId
                });
            }

            if (!clientAddresses.IsNullOrEmpty())
                _dbContext.ClientAddresses.AddRange(clientAddresses);
        }
    }
}
