using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Delete
{
    public record DeleteRequest(int Id) : IRequest<CommandResult>;
}
