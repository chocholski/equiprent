namespace Equiprent.Data.Services
{
    public interface IUserService
    {
        public int? GetUserId();
        public Task<int?> GetCurrentUserLanguageIdAsync();
    }
}