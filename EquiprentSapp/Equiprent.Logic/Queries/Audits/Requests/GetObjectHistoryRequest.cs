using Equiprent.Logic.Queries.Audits.Reponses.ObjectHistory;
using MediatR;

namespace Equiprent.Logic.Queries.Audits.Requests
{
    public class GetObjectHistoryRequest : IRequest<ObjectHistoryResponse?>
    {
        public RequestParameters RequestParameters { get; }
        public string EntityId { get; set; }
        public string EntityTableName { get; set; }

        public GetObjectHistoryRequest(RequestParameters requestParameters, string entityId, string entityTableName)
        {
            RequestParameters = requestParameters.GetWithDefaultSortColumnNameIfSortColumnNameIsNullOrEmptyBasedOn(typeof(ObjectHistoryItemViewModel));
            EntityId = entityId;
            EntityTableName = entityTableName;
        }
    }
}
