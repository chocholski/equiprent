using Equiprent.Entities.Application;

namespace Equiprent.Data.Services
{
    public interface IUserService
    {
        public Guid? GetUserId();
        public Task<int?> GetCurrentUserLanguageIdAsync();
        public Task SetTokenRefreshRequiredForUsersAsync(IEnumerable<Guid> userIds);
    }
}