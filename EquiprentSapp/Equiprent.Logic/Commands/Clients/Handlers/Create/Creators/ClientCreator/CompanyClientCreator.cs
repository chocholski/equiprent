using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientAddressesCreators;
using Equiprent.Logic.Commands.Clients.Requests.Create;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientCreator
{
    internal class CompanyClientCreator : IClientCreator
    {
        private readonly ApplicationDbContext _dbContext;

        public CompanyClientCreator(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateClientAddressesWithRequest(Client client, CreateRequest creatingRequest)
        {
            new CompanyClientAddressesCreator(_dbContext).CreateClientAddressesWithRequest(client, creatingRequest);
        }

        public Client? CreateClientWithRequest(CreateRequest creatingRequest)
        {
            return new CompanyClient
            {
                ClientTypeId = creatingRequest.TypeId,
                CreatedById = creatingRequest.CreatedById,
                CreatedOn = DateTime.Now,
                Name = creatingRequest.Name,
            };
        }
    }
}
