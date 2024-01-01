using Equiprent.ApplicationInterfaces.Users;
using Equiprent.ApplicationInterfaces.Users.Languages;
using Equiprent.Data.DbContext;

namespace Equiprent.ApplicationImplementations.Users.Languages
{
    public class UserLanguageService : IUserLanguageService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userService;

        public UserLanguageService(
            ApplicationDbContext dbContext,
            IUserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        public async Task<int?> GetCurrentUserLanguageIdAsync(CancellationToken cancellationToken = default)
        {
            int? result = null;
            var currentUserId = _userService.GetUserId();

            if (currentUserId.HasValue)
            {
                result = await _dbContext.Users
                    .Where(u => u.Id == currentUserId.Value)
                    .Select(u => (int?)u.LanguageId)
                    .SingleOrDefaultAsync(cancellationToken);
            }

            return result;
        }
    }
}
