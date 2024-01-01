using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Identities.Tokens;
using Equiprent.ApplicationInterfaces.Users.Passwords;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.Save;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class SaveHandler : IRequestHandler<SaveRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenRefreshService _tokenRefreshService;

        public SaveHandler(
            ApplicationDbContext dbContext,
            IPasswordHasher passwordHasher,
            ITokenRefreshService tokenRefreshService)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _tokenRefreshService = tokenRefreshService;
        }

        public async Task<CommandResult> Handle(SaveRequest request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id, cancellationToken);

            if (user is null || !request.UserRoleId.HasValue)
                return CommandResult.BadRequest;

            if (user.UserRoleId != request.UserRoleId)
                await _tokenRefreshService.SetTokenRefreshRequiredForUsersAsync(new HashSet<Guid>() { user.Id }, cancellationToken);

            user.Email = request.Email;
            user.FirstName = request.FirstName;
            user.IsActive = request.IsActive;
            user.LastName = request.LastName;
            user.UserRoleId = request.UserRoleId.Value;

            if (!string.IsNullOrEmpty(request.Password))
                user.Password = _passwordHasher.GetHash(request.Password);

            await _dbContext.Users.UpdateAndSaveAsync(user, cancellationToken);

            return CommandResult.OK;
        }
    }
}
