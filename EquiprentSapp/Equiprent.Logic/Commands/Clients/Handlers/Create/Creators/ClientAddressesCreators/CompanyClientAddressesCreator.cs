﻿using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.Clients.Addresses;
using Equiprent.Extensions;
using Equiprent.Logic.Commands.Clients.Requests.Create;
using Equiprent.Logic.GeneralModels;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientAddressesCreators
{
    internal class CompanyClientAddressesCreator : ClientAddressesCreator
    {
        public CompanyClientAddressesCreator(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public override void CreateClientAddressesWithRequest(Client client, CreateRequest creatingRequest)
        {
            var clientAddresses = new List<CompanyClientAddress>();

            foreach (var requestAddress in creatingRequest.Addresses)
            {
                var address = AddressModel.CreateAddressFromModel(requestAddress);
                _dbContext.Addresses.Add(address);

                clientAddresses.Add(new CompanyClientAddress
                {
                    CompanyClient = client,
                    Address = address,
                    NationalCompanyId = requestAddress.NationalId
                });
            }

            if (!clientAddresses.IsNullOrEmpty())
                _dbContext.ClientAddresses.AddRange(clientAddresses);
        }
    }
}
