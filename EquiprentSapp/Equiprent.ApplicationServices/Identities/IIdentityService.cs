using Equiprent.Entities.Application;
using System.Security.Claims;

namespace Equiprent.ApplicationServices.Identities
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> GetTokenAsync(string grantType, string? clientSecret, string userName, string password);
        Task<AuthenticationResult> GetTokenAsync(User user);
        ClaimsPrincipal? GetPrincipalFromToken(string? token);
    }
}
