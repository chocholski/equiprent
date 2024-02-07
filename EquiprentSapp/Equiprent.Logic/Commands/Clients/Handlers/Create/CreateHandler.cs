using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Users;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Compositions;
using Equiprent.Logic.Commands.Clients.Handlers.Create.Creators;
using Equiprent.Logic.Commands.Clients.Requests.Create;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create
{
    public class CreateHandler : IRequestHandler<CreateRequest, CommandResult?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userService;

        public CreateHandler(
            ApplicationDbContext dbContext,
            IUserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        public async Task<CommandResult?> Handle(CreateRequest request, CancellationToken cancellationToken)
        {
            var createdById = _userService.GetUserId();
            if (!createdById.HasValue)
                return CommandResult.BadRequest;

            var clientCreator = new ClientCreatorFactory(_dbContext).GetClientCreator(request);
            if (clientCreator is null)
                return CommandResult.BadRequest;

            var client = clientCreator.CreateClientWithRequest(
                new CreateRequestWithCreatorId(request, createdById.Value));

            if (client is null)
                return CommandResult.BadRequest;

            clientCreator.CreateClientAddressesWithRequest(client, request);
            await _dbContext.Clients.AddAndSaveAsync(client, cancellationToken);

            return CommandResult.OK;
        }
    }
}
