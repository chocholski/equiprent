using Equiprent.Logic.Queries.Clients.Responses.ClientRepresentativeById;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Clients.Requests
{
    public class GetClientRepresentativeByIdRequest : IQuery<ClientRepresentativeByIdResponse>
    {
        public Guid ClientRepresentativeId { get; set; }

        public GetClientRepresentativeByIdRequest(Guid clientRepresentativeId) => ClientRepresentativeId = clientRepresentativeId;
    }
}
