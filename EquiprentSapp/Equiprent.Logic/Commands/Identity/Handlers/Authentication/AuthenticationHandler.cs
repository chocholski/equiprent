using Equiprent.ApplicationInterfaces.Identities;
using Equiprent.ApplicationInterfaces.Identities.Models;
using Equiprent.Logic.Commands.Identity.Requests.Authentication;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Identity.Handlers.Authentication
{
    public class AuthenticationHandler : IRequestHandler<AuthenticationRequest, IAuthenticationResult>
    {
        private readonly IIdentityService _identityService;

        public AuthenticationHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<IAuthenticationResult> Handle(AuthenticationRequest request, CancellationToken cancellationToken)
        {
            return await _identityService.GetTokenAsync(request.GrantType, request.ClientSecret, request.UserName, request.Password, cancellationToken);
        }
    }
}
