using Equiprent.Logic.Queries.Clients.Responses.ClientById;
using MediatR;

namespace Equiprent.Logic.Queries.Clients.Requests
{
    public class GetClientByIdRequest : IRequest<ClientByIdResponse?>
    {
        public Guid ClientId { get; set; }

        public GetClientByIdRequest(Guid clientId) => ClientId = clientId;
    }
}
