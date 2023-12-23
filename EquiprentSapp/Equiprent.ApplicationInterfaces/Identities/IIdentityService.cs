using Equiprent.ApplicationInterfaces.Identities.Models;

namespace Equiprent.ApplicationInterfaces.Identities
{
    public interface IIdentityService
    {
        Task<IAuthenticationResult> GetTokenAsync(string grantType, string? clientSecret, string userName, string password);
        Task<IAuthenticationResult> RefreshTokenAsync(string token, Guid? refreshToken);
    }
}
