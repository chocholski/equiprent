namespace Equiprent.ApplicationInterfaces.Identities.Tokens
{
    public interface ITokenRefreshService
    {
        public Task SetTokenRefreshRequiredForUsersAsync(IEnumerable<Guid> userIds);
    }
}
