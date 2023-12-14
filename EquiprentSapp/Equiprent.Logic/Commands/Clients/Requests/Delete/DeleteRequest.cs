using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Requests.Delete
{
    public record DeleteRequest(Guid Id) : ICommand;
}
