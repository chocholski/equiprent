using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.ChangeRole
{
    public record ChangeRoleRequest(Guid UserId, int UserRoleId) : ICommand;
}
