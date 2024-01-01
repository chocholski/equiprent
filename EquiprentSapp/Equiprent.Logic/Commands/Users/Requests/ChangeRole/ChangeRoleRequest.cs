using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Users.Requests.ChangeRole
{
    public record ChangeRoleRequest : IRequest<CommandResult>
    {
        public Guid UserId { get; set; }
        public int UserRoleId { get; set; }
    }
}
