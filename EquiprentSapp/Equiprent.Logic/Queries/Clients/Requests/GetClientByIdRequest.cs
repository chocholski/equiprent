using Equiprent.Logic.Queries.Clients.Responses.ClientById;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Clients.Requests
{
    public class GetClientByIdRequest : IQuery<ClientByIdResponse>
    {
        public Guid ClientId { get; set; }

        public GetClientByIdRequest(Guid clientId) => ClientId = clientId;
    }
}
