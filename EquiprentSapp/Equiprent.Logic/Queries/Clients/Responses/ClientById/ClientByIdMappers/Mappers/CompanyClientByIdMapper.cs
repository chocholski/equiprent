﻿using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Addresses.Models;

namespace Equiprent.Logic.Queries.Clients.Responses.ClientById.ClientByIdMappers.Mappers
{
    internal class CompanyClientByIdMapper : ClientByIdMapper
    {
        private readonly CompanyClient _client;

        public CompanyClientByIdMapper(
            ApplicationDbContext dbContext,
            CompanyClient client) : base(dbContext)
        {
            _client = client;
        }

        public override async Task MapToResponseAsync(ClientByIdResponse response)
        {
            response.Id = _client.Id;
            response.Name = _client.Name!;
            response.TypeId = _client.ClientTypeId;

            var clientAddress = await _dbContext.CompanyClientAddresses
                .Include(clientAddress => clientAddress.Address)
                .Where(clientAddress => clientAddress.CompanyClientId == _client.Id)
                .SingleOrDefaultAsync();

            if (clientAddress is null)
                return;

            response.Addresses.Add(new ClientAddressModel
            {
                ApartmentNumber = clientAddress.Address.ApartmentNumber,
                City = clientAddress.Address.City,
                CountryId = clientAddress.Address.CountryId,
                Email = clientAddress.Address.Email,
                Id = clientAddress.Id,
                NationalId = clientAddress.NationalCompanyId!,
                PhoneNumber = clientAddress.Address.PhoneNumber,
                PostalCode = clientAddress.Address.PostalCode,
                StreetName = clientAddress.Address.StreetName,
                StreetNumber = clientAddress.Address.StreetNumber,
            });
        }
    }
}