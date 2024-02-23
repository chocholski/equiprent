using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Clients.Requests.DeleteClientRepresentativesForClient
{
    public class DeleteRepresentativesForClientRequest : IRequest<CommandResult>
    {
        public Guid ClientId { get; set; }

        public DeleteRepresentativesForClientRequest(Guid clientId) => ClientId = clientId;
    }
}
