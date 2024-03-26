using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Creators.ClientCreator;
using Equiprent.Logic.Commands.Clients.Requests.Create;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Creators
{
    internal sealed class ClientCreatorFactory
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly CreateRequest _request;

        public ClientCreatorFactory(ApplicationDbContext dbContext, CreateRequest request)
        { 
            _dbContext = dbContext;
            _request = request;
        }

        public IClientCreator GetClientCreator()
        {
            return _request.TypeId switch
            {
                (int)ClientTypeEnum.Private => new PrivateClientCreator(_dbContext, _request),
                (int)ClientTypeEnum.Company => new CompanyClientCreator(_dbContext, _request),
                _ => throw new Exception($"Unsupported type of client typeId: {_request.TypeId}")
            };
        }
    }
}
