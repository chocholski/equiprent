using System.Security.Claims;
using Equiprent.Data.DbContext;
using Microsoft.AspNetCore.Http;

namespace Equiprent.Data.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IHttpContextAccessor _httpAccessor;

        public UserService(ApplicationDbContext dbContext, IHttpContextAccessor httpAccessor)
        {
            _dbContext = dbContext;
            _httpAccessor = httpAccessor;
        }

        public Guid? GetUserId()
        {
            var userId = _httpAccessor.HttpContext?.User?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

            return userId is not null && Guid.TryParse(userId.Value, out Guid currentUserId) ? currentUserId : null;
        }

        public async Task<int?> GetCurrentUserLanguageIdAsync()
        {
            int? result = null;
            var currentUserId = GetUserId();

            if (currentUserId.HasValue)
            {
                result = await _dbContext.ApplicationUsers
                    .Where(user => user.Id == currentUserId.Value)
                    .Select(user => (int?)user.LanguageId)
                    .SingleOrDefaultAsync();
            }

            return result;
        }
    }
}
