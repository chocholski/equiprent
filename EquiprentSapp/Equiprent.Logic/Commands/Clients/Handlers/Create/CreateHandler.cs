using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Creators;
using Equiprent.Logic.Commands.Clients.Requests.Create;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create
{
    public class CreateHandler : IRequestHandler<CreateRequest, CommandResult?>
    {
        private readonly ApplicationDbContext _dbContext;

        public CreateHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CommandResult?> Handle(CreateRequest request, CancellationToken cancellationToken)
        {
            var clientCreator = new ClientCreatorFactory(_dbContext, request).GetClientCreator();
            if (clientCreator is null)
                return CommandResult.BadRequest;

            var client = clientCreator.CreateClient();
            clientCreator.CreateClientAddresses(client);
            await _dbContext.Clients.AddAndSaveAsync(client, cancellationToken);

            return CommandResult.OK;
        }
    }
}
