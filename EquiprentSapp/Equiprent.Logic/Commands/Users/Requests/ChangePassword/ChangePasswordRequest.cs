using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.ChangePassword
{
    public record ChangePasswordRequest(Guid Id, string OldPassword, string Password) : ICommand;
}
