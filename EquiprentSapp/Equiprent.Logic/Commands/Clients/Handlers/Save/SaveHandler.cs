using Equiprent.ApplicationImplementations.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Handlers.Save.Updaters;
using Equiprent.Logic.Commands.Clients.Requests.Save;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Handlers.Save
{
    public class SaveHandler : ICommandHandler<SaveRequest>
    {
        private readonly ApplicationDbContext _dbContext;

        public SaveHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult> HandleAsync(SaveRequest request)
        {
            var client = await _dbContext.Clients
                .SingleOrDefaultAsync(c => !c.IsDeleted && c.Id == request.Id);

            if (client is null)
                return CommandResult.BadRequest;

            var clientUpdateStrategy = new ClientUpdateStrategyFactory(_dbContext)
                .GetClientUpdateStrategy(client, request);

            var updatedClient = await clientUpdateStrategy.UpdateClientWithRequestAsync(client, request);

            if (updatedClient is null)
                return CommandResult.BadRequest;

            if (!await clientUpdateStrategy.UpdateClientAddressesWithRequestAsync(client, updatedClient, request))
                return CommandResult.BadRequest;

            await _dbContext.SaveChangesAsync();

            return CommandResult.OK;
        }

        public async Task<CommandResult> ValidateAsync(SaveRequest request)
        {
            if (await ValidateIfExistClientWithSameNameAsync(request))
                return CommandResult.Client_NameExists;

            if (await ValidateIfExistClientWithSameNationalIdAsync(request))
                return CommandResult.Client_NationalIdExists;

            return CommandResult.OK;
        }

        private async Task<bool> ValidateIfExistClientWithSameNameAsync(SaveRequest request)
        {
            return await _dbContext.Clients
                .Where(c =>
                    !c.IsDeleted &&
                    c.Id != request.Id &&
                    c.Name == request.Name)
                .AnyAsync();
        }

        private async Task<bool> ValidateIfExistClientWithSameNationalIdAsync(SaveRequest request)
        {
            return request.TypeId switch
            {
                (int)ClientTypeEnum.Private => await ValidateIfExistPrivateClientWithSameCitizenNationalIdAsync(request),
                (int)ClientTypeEnum.Company => await ValidateIfExistCompanyClientWithSameCompanyNationalIdAsync(request),
                _ => false
            };
        }

        private async Task<bool> ValidateIfExistPrivateClientWithSameCitizenNationalIdAsync(SaveRequest request)
        {
            return await _dbContext.PrivateClientAddresses
                .Include(clientAddress => clientAddress.PrivateClient)
                .Where(clientAddress =>
                    !clientAddress.PrivateClient.IsDeleted &&
                    clientAddress.PrivateClientId != request.Id &&
                    !string.IsNullOrEmpty(clientAddress.NationalCitizenId) &&
                    request.Addresses.Select(address => address.NationalId).Contains(clientAddress.NationalCitizenId))
                .AnyAsync();
        }

        private async Task<bool> ValidateIfExistCompanyClientWithSameCompanyNationalIdAsync(SaveRequest request)
        {
            return await _dbContext.CompanyClientAddresses
                .Include(clientAddress => clientAddress.CompanyClient)
                .Where(clientAddress =>
                    !clientAddress.CompanyClient.IsDeleted &&
                    clientAddress.CompanyClientId != request.Id &&
                    !string.IsNullOrEmpty(clientAddress.NationalCompanyId) &&
                    request.Addresses.Select(address => address.NationalId).Contains(clientAddress.NationalCompanyId))
                .AnyAsync();
        }
    }
}
