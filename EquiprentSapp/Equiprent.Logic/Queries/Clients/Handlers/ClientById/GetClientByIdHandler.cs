using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.ClientById;
using Equiprent.Logic.Queries.Clients.Responses.ClientById.ClientByIdMappers;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Clients.Handlers.ClientById
{
    public class GetClientByIdHandler : IRequestHandler<GetClientByIdRequest, ClientByIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetClientByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ClientByIdResponse?> Handle(GetClientByIdRequest request, CancellationToken cancellationToken = default)
        {
            var client = await _dbContext.Clients
                .SingleOrDefaultAsync(c => !c.IsDeleted && c.Id == request.ClientId, cancellationToken);

            if (client is null)
                return null;

            var clientByIdMapper = new ClientByIdMapperFactory(_dbContext).CreateMapperFor(client);

            if (clientByIdMapper is null)
                return null;

            return await clientByIdMapper.MapToResponseAsync(cancellationToken);
        }
    }
}
