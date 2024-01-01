using Equiprent.ApplicationInterfaces.Identities;
using Equiprent.ApplicationInterfaces.Identities.Models;
using Equiprent.Logic.Commands.Identity.Requests.RefreshToken;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Identity.Handlers.RefreshToken
{
    public class RefreshTokenHandler : IRequestHandler<RefreshTokenRequest, IAuthenticationResult>
    {
        private readonly IIdentityService _identityService;

        public RefreshTokenHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<IAuthenticationResult> Handle(RefreshTokenRequest request, CancellationToken cancellationToken)
        {
            return await _identityService.RefreshTokenAsync(request.Token, request.RefreshToken, cancellationToken);
        }
    }
}
