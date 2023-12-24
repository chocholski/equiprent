namespace Equiprent.ApplicationInterfaces.Users.Languages
{
    public interface IUserLanguageService
    {
        public Task<int?> GetCurrentUserLanguageIdAsync();
    }
}
