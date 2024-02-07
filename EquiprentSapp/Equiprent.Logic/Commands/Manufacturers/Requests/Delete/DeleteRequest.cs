using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Manufacturers.Requests.Delete
{
    public record DeleteRequest(Guid Id) : IRequest<CommandResult>;
}
