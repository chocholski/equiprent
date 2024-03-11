using Equiprent.ApplicationInterfaces.Identities.Models;
using MediatR;

namespace Equiprent.Logic.Commands.Identity.Requests.Authentication
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AuthenticationRequest : IRequest<IAuthenticationResult>
    {
        public string? ClientSecret { get; set; }
        public required string GrantType { get; set; }
        public required string Password { get; set; }
        public required string UserName { get; set; }
    }
}
