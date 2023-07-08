using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Delete
{
    public record DeleteRequest(int Id) : ICommand;
}
