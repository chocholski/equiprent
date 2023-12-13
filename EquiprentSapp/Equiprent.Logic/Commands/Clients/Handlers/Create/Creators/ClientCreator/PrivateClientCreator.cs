using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Compositions;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientAddressesCreators;
using Equiprent.Logic.Commands.Clients.Requests.Create;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientCreator
{
    internal class PrivateClientCreator : IClientCreator
    {
        private readonly ApplicationDbContext _dbContext;

        public PrivateClientCreator(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateClientAddressesWithRequest(Client client, CreateRequest creatingRequest)
        {
            new PrivateClientAddressesCreator(_dbContext).CreateClientAddressesWithRequest(client, creatingRequest);
        }

        public Client? CreateClientWithRequest(CreateRequestWithCreatorId creatingRequest)
        {
            return new PrivateClient
            {
                ClientTypeId = creatingRequest.TypeId,
                CreatedById = creatingRequest.CreatedById,
                CreatedOn = DateTime.Now,
                FirstName = creatingRequest.FirstName!,
                LastName = creatingRequest.LastName!,
                Name = creatingRequest.Name,
            };
        }
    }
}
