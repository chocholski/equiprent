using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Clients.Requests.DeleteClientRepresentative
{
    public record DeleteRequest(Guid Id) : IRequest<CommandResult?>;
}
