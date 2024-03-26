using Equiprent.Data.DbContext;
using MediatR;

namespace Equiprent.Data.CustomQueries.Queries.Rentals.Requests
{
    public record GetRentalListQueryRequest : IRequest<string>
    {
        public ApplicationDbContext DbContext { get; init; }

        public GetRentalListQueryRequest(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }
    }
}
