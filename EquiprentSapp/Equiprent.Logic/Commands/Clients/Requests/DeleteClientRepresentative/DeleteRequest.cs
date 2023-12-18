using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Clients.Requests.DeleteClientRepresentative
{
    public record DeleteRequest(Guid Id) : ICommand;
}
