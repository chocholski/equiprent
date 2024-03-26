using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientAddressesCreators;
using Equiprent.Logic.Commands.Clients.Requests.Create;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientCreator
{
    internal class CompanyClientCreator : IClientCreator
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly CreateRequest _request;

        public CompanyClientCreator(ApplicationDbContext dbContext, CreateRequest request)
        {
            _dbContext = dbContext;
            _request = request;
        }

        public void CreateClientAddresses(Client client)
        {
            new CompanyClientAddressesCreator(_dbContext).CreateClientAddressesWithRequest(client, _request);
        }

        public Client CreateClient()
        {
            return new CompanyClient
            {
                ClientTypeId = _request.TypeId,
                CreatedById = _request.CreatedById,
                CreatedOn = DateTime.Now,
                Name = _request.Name,
            };
        }
    }
}
