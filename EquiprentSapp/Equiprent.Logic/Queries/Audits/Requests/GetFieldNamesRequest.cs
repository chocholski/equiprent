using Equiprent.Logic.Queries.Audits.Reponses.FieldNames;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Audits.Requests
{
    public class GetFieldNamesRequest : IQuery<FieldNamesResponse>
    {
        public RequestParameters RequestParameters { get; } = new();
        public string EntityId { get; set; }
        public string EntityTableName { get; set; }

        public GetFieldNamesRequest(string entityId, string entityTableName)
        {
            if (string.IsNullOrEmpty(RequestParameters.SortColumnName) ||
                RequestParameters.SortColumnName == "null")
            {
                RequestParameters.SortColumnName = nameof(FieldNamesItemViewModel.Translation);
            }

            EntityId = entityId;
            EntityTableName = entityTableName;
        }
    }
}
