using Equiprent.Logic.Queries.Clients.Responses.ClientRepresentativeById;
using MediatR;

namespace Equiprent.Logic.Queries.Clients.Requests
{
    public class GetClientRepresentativeByIdRequest : IRequest<ClientRepresentativeByIdResponse?>
    {
        public Guid ClientRepresentativeId { get; set; }

        public GetClientRepresentativeByIdRequest(Guid clientRepresentativeId) => ClientRepresentativeId = clientRepresentativeId;
    }
}
