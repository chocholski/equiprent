using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Logic.Queries.Audits.Reponses.FieldNames;
using MediatR;

namespace Equiprent.Logic.Queries.Audits.Requests
{
    public class GetFieldNamesRequest : IRequest<FieldNamesResponse?>
    {
        public RequestParameters RequestParameters { get; } = new();
        public string EntityId { get; set; }
        public string EntityTableName { get; set; }

        public GetFieldNamesRequest(RequestParameters requestParameters, string entityId, string entityTableName)
        {
            RequestParameters = requestParameters;
            if (string.IsNullOrEmpty(RequestParameters.SortColumnName) ||
                RequestParameters.SortColumnName == "null")
            {
                RequestParameters.SortColumnName = nameof(AuditListQueryModel.FieldName);
            }

            EntityId = entityId;
            EntityTableName = entityTableName;
        }
    }
}
