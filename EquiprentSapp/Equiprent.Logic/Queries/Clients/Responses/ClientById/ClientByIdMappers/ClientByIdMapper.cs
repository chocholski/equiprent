using Equiprent.Data.DbContext;

namespace Equiprent.Logic.Queries.Clients.Responses.ClientById.ClientByIdMappers
{
    internal abstract class ClientByIdMapper
    {
        protected readonly ApplicationDbContext _dbContext;

        protected ClientByIdMapper(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public abstract Task MapToResponseAsync(ClientByIdResponse response);
    }
}
