using Equiprent.ApplicationServices.CommandResults;
using Equiprent.ApplicationServices.Identities;
using Equiprent.Logic.QueryData.Authentication;
using Refit;
using System.Threading.Tasks;

namespace Equiprent.Sdk
{
    public interface IIdentityApi
    {
        [Post("/api/identity/authenticate")]
        Task<ApiResponse<AuthenticationResult>> AuthenticateAsync([Body] AuthenticationRequest authenticationRequest);

        [Post("/api/identity/refreshToken")]
        Task<ApiResponse<AuthenticationResult>> RefreshTokenAsync([Body] RefreshTokenRequest refreshTokenRequest);

        [Put("/api/identity/changePassword")]
        Task<ApiResponse<CommandResult>> ChangePasswordAsync([Body] ChangePasswordRequest changePasswordRequest);
    }
}
