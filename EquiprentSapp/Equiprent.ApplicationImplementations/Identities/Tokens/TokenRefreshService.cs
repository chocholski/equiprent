using Equiprent.ApplicationInterfaces.Identities.Tokens;
using Equiprent.Data.DbContext;

namespace Equiprent.ApplicationImplementations.Identities.Tokens
{
    public class TokenRefreshService : ITokenRefreshService
    {
        private readonly ApplicationDbContext _dbContext;

        public TokenRefreshService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SetTokenRefreshRequiredForUsersAsync(IEnumerable<Guid> userIds, CancellationToken cancellationToken = default)
        {
            foreach (var userId in userIds)
            {
                var refreshToken = await _dbContext.RefreshTokens
                    .Where(token => token.UserId == userId)
                    .OrderByDescending(token => token.CreatedOn)
                    .FirstOrDefaultAsync(cancellationToken);

                if (refreshToken is null)
                    continue;

                refreshToken.IsTokenRefreshRequired = true;

                await _dbContext.RefreshTokens.UpdateAndSaveAsync(refreshToken, cancellationToken);
            }
        }
    }
}
