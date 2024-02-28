using Equiprent.Data.DbContext;
using MediatR;

namespace Equiprent.Data.CustomQueries.Queries.Equipments.Requests
{
    public class GetEquipmentListQueryRequest : IRequest<string>
    {
        public readonly ApplicationDbContext DbContext;

        public GetEquipmentListQueryRequest(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }
    }
}
