using Equiprent.ApplicationInterfaces.Identities.Models;

namespace Equiprent.ApplicationInterfaces.Identities
{
    public interface IIdentityService
    {
        Task<IAuthenticationResult> GetTokenAsync(string grantType, string? clientSecret, string userName, string password, CancellationToken cancellationToken = default);
        Task<IAuthenticationResult> RefreshTokenAsync(string token, Guid? refreshToken, CancellationToken cancellationToken = default);
    }
}
