using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientCreator;
using Equiprent.Logic.Commands.Clients.Requests.Create;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Creators
{
    internal class ClientCreatorFactory
    {
        private readonly ApplicationDbContext _dbContext;

        public ClientCreatorFactory(ApplicationDbContext dbContext)
        { 
            _dbContext = dbContext;
        }

        public IClientCreator GetClientCreator(CreateRequest creatingRequest)
        {
            if (creatingRequest.TypeId == (int)ClientTypeEnum.Private)
            {
                return new PrivateClientCreator(_dbContext);
            }
            else if (creatingRequest.TypeId == (int)ClientTypeEnum.Company)
            {
                return new CompanyClientCreator(_dbContext);
            }
            else
            {
                throw new Exception($"Unsupported type of client typeId: {creatingRequest.TypeId}");
            }
        }
    }
}
