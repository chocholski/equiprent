using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Queries.Clients.Responses.ClientById.ClientByIdMappers.Mappers;

namespace Equiprent.Logic.Queries.Clients.Responses.ClientById.ClientByIdMappers
{
    internal class ClientByIdMapperFactory
    {
        private readonly ApplicationDbContext _dbContext;

        public ClientByIdMapperFactory(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ClientByIdMapper? CreateMapperFor(Client client)
        {
            if (client is PrivateClient privateClient)
            {
                return new PrivateClientByIdMapper(_dbContext, privateClient);
            }
            else if (client is CompanyClient companyClient)
            {
                return new CompanyClientByIdMapper(_dbContext, companyClient);
            }

            return null;
        }
    }
}
