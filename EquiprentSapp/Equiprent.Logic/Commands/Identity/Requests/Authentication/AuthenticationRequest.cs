using Equiprent.ApplicationInterfaces.Identities.Models;
using MediatR;

namespace Equiprent.Logic.Commands.Identity.Requests.Authentication
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AuthenticationRequest : IRequest<IAuthenticationResult>
    {
        public string? ClientSecret { get; set; }
        public string GrantType { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string UserName { get; set; } = null!;
    }
}
