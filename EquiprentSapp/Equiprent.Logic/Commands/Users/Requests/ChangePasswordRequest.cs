using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public record ChangePasswordRequest(Guid Id, string OldPassword, string Password) : ICommand;
}
