using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Identities.Tokens;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.ChangeLanguage;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangeLanguageHandler : IRequestHandler<ChangeLanguageRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ITokenRefreshService _tokenRefreshService;

        public ChangeLanguageHandler(
            ApplicationDbContext dbContext,
            ITokenRefreshService tokenRefreshService)
        {
            _dbContext = dbContext;
            _tokenRefreshService = tokenRefreshService;
        }

        public async Task<CommandResult> Handle(ChangeLanguageRequest request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id, cancellationToken);

            if (user is null)
                return CommandResult.BadRequest;

            if (user.LanguageId != request.LanguageId)
                await _tokenRefreshService.SetTokenRefreshRequiredForUsersAsync(new HashSet<Guid>() { user.Id }, cancellationToken);

            user.LanguageId = request.LanguageId;

            await _dbContext.Users.UpdateAndSaveAsync(user, cancellationToken);

            return CommandResult.OK;
        }
    }
}
