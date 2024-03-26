using Equiprent.Data.DbContext;
using MediatR;

namespace Equiprent.Data.CustomQueries.Queries.Equipments.Requests
{
    public record GetEquipmentListQueryRequest : IRequest<string>
    {
        public ApplicationDbContext DbContext { get; init; }

        public GetEquipmentListQueryRequest(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }
    }
}
