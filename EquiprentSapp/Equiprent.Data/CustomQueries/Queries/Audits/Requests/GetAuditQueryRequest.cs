using Equiprent.Data.DbContext;
using MediatR;

namespace Equiprent.Data.CustomQueries.Queries.Audits.Requests
{
    public class GetAuditQueryRequest : IRequest<string>
    {
        public readonly ApplicationDbContext DbContext;
        public readonly string Id;
        public readonly string TableName;

        public GetAuditQueryRequest(ApplicationDbContext dbContext, string id, string tableName)
        {
            DbContext = dbContext;
            Id = id;
            TableName = tableName;
        }
    }
}
