namespace Equiprent.Data.Services
{
    public interface IUserService
    {
        public Guid? GetUserId();
        public Task<int?> GetCurrentUserLanguageIdAsync();
    }
}