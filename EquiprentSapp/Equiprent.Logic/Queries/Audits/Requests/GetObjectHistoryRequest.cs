using Equiprent.Logic.Queries.Audits.Reponses.ObjectHistory;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Audits.Requests
{
    public class GetObjectHistoryRequest : IQuery<ObjectHistoryResponse>
    {
        public RequestParameters RequestParameters { get; }
        public string EntityId { get; set; }
        public string EntityTableName { get; set; }

        public GetObjectHistoryRequest(RequestParameters requestParameters, string entityId, string entityTableName)
        {
            RequestParameters = requestParameters;

            if (string.IsNullOrEmpty(RequestParameters.SortColumnName) ||
                RequestParameters.SortColumnName == "null")
            {
                RequestParameters.SortColumnName = "CreatedOn";
            }

            EntityId = entityId;
            EntityTableName = entityTableName;
        }
    }
}
