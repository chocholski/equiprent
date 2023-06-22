using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public record ChangeRoleRequest(Guid UserId, int UserRoleId) : ICommand;
}
