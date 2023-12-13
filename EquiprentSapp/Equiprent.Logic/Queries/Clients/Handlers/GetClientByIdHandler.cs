using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.ClientById;
using Equiprent.Logic.Queries.Clients.Responses.ClientById.ClientByIdMappers;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Clients.Handlers
{
    public class GetClientByIdHandler : IQueryHandler<GetClientByIdRequest, ClientByIdResponse>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetClientByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ClientByIdResponse?> HandleAsync(GetClientByIdRequest request)
        {
            var client = await _dbContext.Clients
                .SingleOrDefaultAsync(c => !c.IsDeleted && c.Id == request.ClientId);

            if (client is null)
                return null;

            var result = new ClientByIdResponse();
            var clientByIdMapper = new ClientByIdMapperFactory(_dbContext).CreateMapperFor(client);

            if (clientByIdMapper is null)
                return null;

            await clientByIdMapper.MapToResponseAsync(result);

            return result;
        }
    }
}
