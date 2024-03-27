using Equiprent.Data.DbContext;
using MediatR;

namespace Equiprent.Data.CustomQueries.Queries.Equipments.Requests
{
    public record GetEquipmentSelectionListQueryRequest : IRequest<string>
    {
        public ApplicationDbContext DbContext { get; init; }

        public GetEquipmentSelectionListQueryRequest(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }
    }
}
