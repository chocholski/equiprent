using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public record DeleteRequest(Guid Id) : ICommand;
}
