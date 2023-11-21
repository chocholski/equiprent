using Equiprent.Logic.Queries.Clients.Responses.PagedClientsList;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Clients.Requests
{
    public class GetPagedClientsListRequest : IQuery<PagedClientsListResponse>
    {
        public RequestParameters RequestParameters { get; set; }

        public GetPagedClientsListRequest(RequestParameters requestParameters)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(ClientListItemViewModel));
        }
    }
}
