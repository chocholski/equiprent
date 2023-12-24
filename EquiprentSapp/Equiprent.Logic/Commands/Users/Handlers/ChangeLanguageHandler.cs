using Equiprent.ApplicationImplementations.CommandResults;
using Equiprent.ApplicationInterfaces.Identities.Tokens;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.ChangeLanguage;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangeLanguageHandler : ICommandHandler<ChangeLanguageRequest>
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

        public async Task<CommandResult> HandleAsync(ChangeLanguageRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id);

            if (user is null)
                return CommandResult.BadRequest;

            if (user.LanguageId != request.LanguageId)
                await _tokenRefreshService.SetTokenRefreshRequiredForUsersAsync(new HashSet<Guid>() { user.Id });           

            user.LanguageId = request.LanguageId;

            await _dbContext.Users.UpdateAndSaveAsync(user);

            return CommandResult.OK;
        }
    }
}
