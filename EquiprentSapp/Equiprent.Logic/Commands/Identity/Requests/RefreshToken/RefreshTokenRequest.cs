using Equiprent.ApplicationInterfaces.Identities.Models;
using MediatR;

namespace Equiprent.Logic.Commands.Identity.Requests.RefreshToken
{
    public record RefreshTokenRequest(string Token, Guid? RefreshToken) : IRequest<IAuthenticationResult>;
}
