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

        public async Task SetTokenRefreshRequiredForUsersAsync(IEnumerable<Guid> userIds)
        {
            foreach (var userId in userIds)
            {
                var refreshToken = await _dbContext.RefreshTokens
                    .Where(token => token.UserId == userId)
                    .OrderByDescending(token => token.CreatedOn)
                    .FirstOrDefaultAsync();

                if (refreshToken is null)
                    return;

                refreshToken.IsTokenRefreshRequired = true;

                await _dbContext.RefreshTokens.UpdateAndSaveAsync(refreshToken);
            }
        }
    }
}
