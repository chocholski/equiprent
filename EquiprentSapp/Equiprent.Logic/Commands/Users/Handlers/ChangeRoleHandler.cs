using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Identities.Tokens;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.ChangeRole;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangeRoleHandler : IRequestHandler<ChangeRoleRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ITokenRefreshService _tokenRefreshService;

        public ChangeRoleHandler(
            ApplicationDbContext dbContext,
            ITokenRefreshService tokenRefreshService)
        {
            _dbContext = dbContext;
            _tokenRefreshService = tokenRefreshService;
        }

        public async Task<CommandResult> Handle(ChangeRoleRequest request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.UserId, cancellationToken);

            if (user is null)
                return CommandResult.BadRequest;

            await _tokenRefreshService.SetTokenRefreshRequiredForUsersAsync(new HashSet<Guid>() { user.Id }, cancellationToken);
            user.UserRoleId = request.UserRoleId;
            await _dbContext.Users.UpdateAndSaveAsync(user, cancellationToken);

            return CommandResult.OK;
        }
    }
}
